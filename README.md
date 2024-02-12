# Technique Interview from NeuroSesne

## Installation

cd client

npm i 

change .env.example to .env

add local server url as VITE_LOCAL



cd ..

cd server

add token.json inside the server folder (token.json from Google Credential Setting)

python manage.py runserver

## Google Setting

### Create access credentials

create a new project in google console

enable apis 

create service account

download json file and rename as token.json

assign related roles to service account

### Create google function

create new function

create two buckers, challenge-process and result_from_ch

change trigger type as cloud storage, event type as google.cloud.storage.object.v1.finalized

change info in google_functions.py

use google_function.py, google_requirements.text as function

deploy function


## Key Features
PDF Upload

Process ReactFlow

Automatic Document AI Trigger

OCR Processer 





## Technologies used

React.js, vite, react-router-dom, axios

Reactflow, Tailwind css, Flowbite

Google Services:

Cloud Functions API

Cloud Document AI API

Cloud Storage

Cloud Storage API
