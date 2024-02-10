from django.http import HttpResponse
from django.views import View
from django.middleware.csrf import get_token
from google.cloud import storage
from .models import download_blob,upload_directory_with_transfer_manager
from pathlib import Path
from django.views.decorators.csrf import csrf_exempt
import os
BASE_DIR = Path(__file__).resolve().parent.parent 
path=os.path.join(BASE_DIR, 'local')

# Create your views here.
def index(request):
    res=download_blob("challenge-process", 'files/Picture1.png', 'local')
    return HttpResponse(res) 


def upload_to_google(request):
    res=upload_directory_with_transfer_manager("challenge-process", os.path.join(BASE_DIR, 'server/local'))
    return HttpResponse(res) 


@csrf_exempt
def post(request):
    print(type(request.body))
    print("Success")
    
    return HttpResponse("sd") 
    # serializer= DataStructureSerializer(data=request.)