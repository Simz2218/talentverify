from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):

    @task(1)
    def load_homepage(self):
        self.client.get("/")

    @task(2)
    def login(self):
        self.client.post("/api/token/", json={"email": "testuser@example.com", "password": "password"})

    @task(3)
    def register(self):
        self.client.post("/api/register/", json={
            "email": "newuser@example.com",
            "username": "newuser",
            "password": "password",
            "password2": "password",
            "company": "4504bc9d",
            "employment_id": "b797629e"
        })

    @task(4)
    def add_employee(self):
        self.client.post("/api/addEmployee/", json={
            "company": "4504bc9d",
            "first_name": "John",
            "last_name": "Doe",
            "employee_id": "22334421T80",
            "department_id": "5c1c22fe",
            "role": "Developer",
            "date_started_role": "2022-01-01",
            "date_left_role": "2023-01-01",
            "duties": "Developing software",
            "employment_status": True
        })

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)
