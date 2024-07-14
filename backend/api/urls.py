from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views
from rest_framework import routers
from api.views import EmployeeViewSet, EmployeeListView, DepartmentListView, UsersListView, UploadEmployeeDataView, EmployeeHistoryListView,EmployeesHistoryListView,EmployeesListView

router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path("token/", views.MyTokenSerializerView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("registerco/", views.CoRegisterView.as_view()),

    path("employees2/", EmployeeListView.as_view()),
    path("employees2/<int:employment_id>/", EmployeeListView.as_view(), name='employee-update'),
    path("employeehistory/", EmployeeHistoryListView.as_view()),
    path("employeedashboard/", EmployeesHistoryListView.as_view()),
    path("employee/", EmployeesListView.as_view()),
    path("departments/", DepartmentListView.as_view()),
    path("departments/<int:department_id>/", DepartmentListView.as_view(), name='department-detail'),
    path("users/", UsersListView.as_view()),
    path("department/", views.addDepartmentView.as_view()),
    path("uploademployees/", UploadEmployeeDataView.as_view()),
    path("", include(router.urls)),
]
