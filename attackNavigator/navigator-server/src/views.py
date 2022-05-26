from rest_framework import viewsets
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.contrib.staticfiles.views import serve


def cors_serve(request, path, insecure=False, **kwargs):
    kwargs.pop('document_root')
    response = serve(request, path, insecure=insecure, **kwargs)
    response['Access-Control-Allow-Origin'] = '*'
    return response
