from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("upload", views.upload_to_google, name="upload_to_google"),
    path("post", views.post, name="data_from_frontend"),
]