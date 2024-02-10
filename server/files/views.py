import json
from django.http import HttpResponse
from django.views import View
from django.middleware.csrf import get_token
from google.cloud import storage
from .models import download_blob,upload_directory_with_transfer_manager
from pathlib import Path
from django.views.decorators.csrf import csrf_exempt
import os
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

BASE_DIR = Path(__file__).resolve().parent.parent 
path=os.path.join(BASE_DIR, 'local')

# Create your views here.
def index(request):
    return HttpResponse("index") 


def upload_to_google(save_directory):
    res=upload_directory_with_transfer_manager("challenge-process", os.path.join(BASE_DIR, save_directory))
    return HttpResponse(res) 
    # serializer.is_valid()
    # print(serializer.is_valid())
    # if serializer.is_valid():
    #     serializer.save()

def front_to_local(files):
    if files:
            for uploaded_file in files:
                with open(os.path.join('local', uploaded_file.name), 'wb+') as destination_file:
                    # Iterate over chunks of the uploaded file and write them to the destination file
                    for chunk in uploaded_file.chunks():
                        destination_file.write(chunk)  
            print("Files saved successfully")

@api_view(['POST'])
@csrf_exempt
def files(request):
    if request.method =='POST':
        save_directory = 'local'  # Update this with your desired directory
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)
        files= request.FILES.getlist('upload')
        front_to_local(files)
        upload_to_google(save_directory)
        for uploaded_file in files:
                os.remove(os.path.join('local', uploaded_file.name))
        print("Files deleted successfully")
        return Response("Upload sucess",status=status.HTTP_201_CREATED)

