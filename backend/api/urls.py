from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views


urlpatterns = [
    path("token/",views.MyTokenSerializerView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view() ),
    path("registerco/",views.CoRegisterView.as_view() ),
    path("dashboard/",views.dashboard),
    path("department/",views.addDepartmentView.as_view() ),
   
    
]