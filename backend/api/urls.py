from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path,include
from api import views
from rest_framework import routers
from api.views import UsersView,EmployeeView


router = routers.DefaultRouter()
router.register(r'User',UsersView,EmployeeView)
urlpatterns = [
    
    path("token/",views.MyTokenSerializerView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view() ),
    path("registerco/",views.CoRegisterView.as_view() ),
    path("employees/",views.EmployeesView.as_view() ),
   
    path("department/",views.addDepartmentView.as_view() ),
    path("", include(router.urls)),
   
    
]