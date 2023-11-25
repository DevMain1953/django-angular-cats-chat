from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('api/cats/', views.CatList.as_view(), name='cats'),
    path('api/cats/<int:pk>/', views.CatDetail.as_view(), name='cat-detail'),
    path('api/register/', views.RegisterUserView.as_view(), name='register'),
    path('api/login/', views.CustomObtainAuthToken.as_view(), name='login'),
    path('api/logout/', views.LogoutUserView.as_view(), name='logout'),
    path('api/chat/', views.MessageList.as_view(), name='chat'),
]

urlpatterns = format_suffix_patterns(urlpatterns)