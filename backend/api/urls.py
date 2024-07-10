from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views
from rest_framework import routers
from api.views import UsersView, EmployeeView, EmployeeListView, DepartmentListView, UsersListView,UploadEmployeeDataView

router = routers.DefaultRouter()
router.register(r'User', UsersView)
router.register(r'Employee', EmployeeView)

urlpatterns = [
    path("token/", views.MyTokenSerializerView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("registerco/", views.CoRegisterView.as_view()),
    path("employees/", views.EmployeesView.as_view()),
    path("employees2/", EmployeeListView.as_view()),
    path("employees2/<employment_id>/", EmployeeListView.as_view(), name='employee-update'),
    
    path("departments/", DepartmentListView.as_view()),
    path("departments/<department_id>/", DepartmentListView.as_view(), name='department-detail'),
    path("users/", UsersListView.as_view()),
    path("department/", views.addDepartmentView.as_view()),
    path("upload-employees/",views.UploadEmployeeDataView.as_view()),
    path("", include(router.urls)),
]
