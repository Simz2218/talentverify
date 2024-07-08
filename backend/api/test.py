from .serializer import CoRegisterSerializer

serializer = CoRegisterSerializer(data=request.data)
if serializer.is_valid():
    print("Data is valid!")
else:
    print("Data is invalid:", serializer.errors)