# import functions_framework
# from google.cloud import storage
# from typing import Optional
# from google.api_core.client_options import ClientOptions
# from google.cloud import documentai  # type: ignore

# # Triggered by a change in a storage bucket
# @functions_framework.cloud_event
# def hello_gcs(cloud_event):
#     data = cloud_event.data

#     event_id = cloud_event["id"]
#     event_type = cloud_event["type"]

#     bucket = data["bucket"]
#     name = data["name"]
#     metageneration = data["metageneration"]
#     timeCreated = data["timeCreated"]
#     updated = data["updated"]

#     print(f"Event ID: {event_id}")
#     print(f"Event type: {event_type}")
#     print(f"Bucket: {bucket}")
#     print(f"File: {name}")
#     print(f"Metageneration: {metageneration}")
#     print(f"Created: {timeCreated}")
#     print(f"Updated: {updated}")
    

#     # TODO: change info
#     # project_id = "cohesive-keel-413713"
#     # location = "eu" # Format is "us" or "eu"
#     # processor_id = "a748d26e00a8be45" # Create processor before running sample
#     # field_mask = "text,entities,pages.pageNumber"  # Optional. The fields to return in the Document object.
#     # mime_type = "application/pdf"
#     # processor_version_id = "pretrained-ocr-v1.0-2020-09-23" # Optional. Processor version to use
#     process_document_sample(project_id,location,bucket,name,processor_id,mime_type,field_mask,processor_version_id)


# def process_document_sample(
#     project_id: str,
#     location: str,
#     bucket: str,
#     name: str,
#     processor_id: str,
#     mime_type: str,
#     field_mask: Optional[str] = None,
#     processor_version_id: Optional[str] = None,
# ) -> None:

#     # Read the file into memory
#     storage_client = storage.Client()
#     bucket = storage_client.bucket(bucket)
#     blob = bucket.blob(name)
#     with blob.open("rb") as f:
#      content=f.read()

#     # Load binary data
#     raw_document = documentai.RawDocument(content=content, mime_type=mime_type)

#     # You must set the `api_endpoint` if you use a location other than "us".
#     opts = ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")

#     client = documentai.DocumentProcessorServiceClient(client_options=opts)

#     if processor_version_id:
#         # The full resource name of the processor version, e.g.:
#         # `projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{processor_version_id}`
#         processname = client.processor_version_path(
#             project_id, location, processor_id, processor_version_id
#         )
#     else:
#         # The full resource name of the processor, e.g.:
#         # `projects/{project_id}/locations/{location}/processors/{processor_id}`
#         processname = client.processor_path(project_id, location, processor_id)

#     # For more information: https://cloud.google.com/document-ai/docs/reference/rest/v1/ProcessOptions
#     # Optional: Additional configurations for processing.
#     process_options = documentai.ProcessOptions(
#         # Process only specific pages
#         individual_page_selector=documentai.ProcessOptions.IndividualPageSelector(
#             pages=[1]
#         )
#     )

#     # Configure the process request
#     request = documentai.ProcessRequest(
#         name=processname,
#         raw_document=raw_document,
#         field_mask=field_mask,
#         process_options=process_options,
#     )
#     result = client.process_document(request=request)

#     # For a full list of `Document` object attributes, reference this page:
#     # https://cloud.google.com/document-ai/docs/reference/rest/v1/Document
#     document = result.document

#        # TODO: change info
#     # # The ID of your GCS bucket
#     # bucket_name = "result_from_ch"
#     # # The contents to upload to the file
#     # contents = document.text
#     # # The ID of your GCS object
#     # destination_blob_name = "re_"+name

#     storage_client = storage.Client()
#     bucket = storage_client.bucket(bucket_name)
#     blob = bucket.blob(destination_blob_name)

#     blob.upload_from_string(contents)

  