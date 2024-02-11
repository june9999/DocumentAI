import base64
import json
import os

from cloudevents.http import CloudEvent

import functions_framework

from google.cloud import pubsub_v1
from google.cloud import storage
from google.cloud import translate_v2 as translate
from google.cloud import vision

publisher = pubsub_v1.PublisherClient()
storage_client = storage.Client()

project_id = "cohesive-keel-413713"


@functions_framework.cloud_event
def process_image(cloud_event: CloudEvent) -> None:
    """Cloud Function triggered by Cloud Storage when a file is changed.

    Gets the names of the newly created object and its bucket then calls
    detect_text to find text in that image.

    detect_text finishes by sending PubSub messages requesting another service
    then complete processing those texts by translating them and saving the
    translations.
    """

    # Check that the received event is of the expected type, return error if not
    expected_type = "google.cloud.storage.object.v1.finalized"
    received_type = cloud_event["type"]
    if received_type != expected_type:
        raise ValueError(f"Expected {expected_type} but received {received_type}")

    # Extract the bucket and file names of the uploaded image for processing
    data = cloud_event.data
    bucket = data["bucket"]
    filename = data["name"]

    # Process the information in the new image

    print(f"File {filename} processed.")
