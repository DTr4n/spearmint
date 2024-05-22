from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('get_access_token', views.get_access_token, name='get_access_token'),
]

