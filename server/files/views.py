from django.http import HttpResponse
from .models import upload_directory_with_transfer_manager,front_to_local,download_bucket_with_transfer_manager
from django.views.decorators.csrf import csrf_exempt
import os
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import requests
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent 

# Create your views here.
def index(request):
    return HttpResponse("index") 


# api view
@api_view(['POST','GET'])
@csrf_exempt
def files(request):
    if request.method =='POST':
        save_directory = 'local'  # Update this with your desired directory
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)
        files= request.FILES.getlist('upload')
        front_to_local(files)
        upload_directory_with_transfer_manager("challenge-process", os.path.join(BASE_DIR, save_directory))
        for uploaded_file in files:
                os.remove(os.path.join('local', uploaded_file.name))
        print("Files deleted successfully")
        return Response("Upload sucess",status=status.HTTP_201_CREATED)
    
    if request.method =='GET':
        download_directory='download' 
        download_bucket_with_transfer_manager("result_from_ch",download_directory)
        files=os.listdir('./download')
        data =[]
        print(files)
        for i in files:
             f = open("./download/" + i, encoding="utf8")
             content= f.read()
             data.append({"name":i,"content":content})
        json_data = json.dumps(data)
     
        return Response(data=data,status=status.HTTP_200_OK,headers={"Data":data})

