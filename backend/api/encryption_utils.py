from django.db import models
from django.conf import settings
from Crypto.Cipher import AES
import base64
import os

class EncryptedField(models.CharField):
    def __init__(self, *args, **kwargs):
        self.secret_key = settings.ENCRYPTION_KEY.ljust(32)[:32].encode('utf-8')
        super().__init__(*args, **kwargs)

    def pad(self, s):
        pad_len = AES.block_size - len(s) % AES.block_size
        return s + chr(pad_len) * pad_len

    def unpad(self, s):
        pad_len = ord(s[-1])
        if pad_len > AES.block_size:
            return s
        return s[:-pad_len]

    def encrypt(self, raw):
        if raw is None:
            return None
        raw = self.pad(raw).encode('utf-8')
        iv = os.urandom(AES.block_size)
        cipher = AES.new(self.secret_key, AES.MODE_CBC, iv)
        encrypted = base64.b64encode(iv + cipher.encrypt(raw))
        return encrypted.decode('utf-8')

    def decrypt(self, enc):
        if enc is None:
            return None
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.secret_key, AES.MODE_CBC, iv)
        decrypted = self.unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')
        return decrypted

    def get_prep_value(self, value):
        if value is None:
            return value
        return self.encrypt(value)

    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return self.decrypt(value)

    def to_python(self, value):
        if isinstance(value, str):
            try:
                return self.decrypt(value)
            except ValueError:
                return value
        return value
