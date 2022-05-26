import json

from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from .scripts.scripts import ExportToJson, DashboardCount, DataSource
from .serializers import TechniqueSerializer, MitigationSerializer, AttacksSerializer, DetectionSerializer, \
    TechniqueMitigationSerializer, TacticSerializer, TechniqueAttackSerializer     #, TechniqueDetectionSerializer
from .models import Technique, Attacks, Mitigation, Detection, TechniqueMitigation, \
    Tactic, TechniqueAttack    #, TechniqueDetection
from django.http import JsonResponse


# @csrf_exempt
class TacticViewSet(viewsets.ModelViewSet):
    queryset = Tactic.objects.all()
    serializer_class = TacticSerializer


# @csrf_exempt
class TechniqueViewSet(viewsets.ModelViewSet):
    lookup_value_regex = '[A-Z0-9.]+'
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer


# class GetTechniqueIdsViewSet(viewsets.ViewSet):
@api_view(['GET'])
def get_technique_ids(request):

    if request.method == "GET":
        id_list = list(Technique.objects.values_list('combine_tech_id', flat=True))
        return JsonResponse(id_list, safe=False)
        # id_list = Technique.objects.only('combine_tech_id')
        # id_list = Technique.objects.all()
        # serializer = TechniqueSerializer(id_list, many=True)
        # return Response(serializer.data)


@api_view(['GET'])
def get_unique_technique_ids(request):
    all_id_list = list(Technique.objects.values_list('combine_tech_id', flat=True))
    attack_id_list = list(Attacks.objects.values_list('sub_technique_id', flat=True))
    unique_id_list = list(set(all_id_list) - set(attack_id_list))
    # print(unique_id_list)
    # a = list(set(y) - set(x))
    return JsonResponse(unique_id_list, safe=False)


@api_view(['PUT'])
def delete_attack_technique(request):

    if request.method == "PUT":
        data = request.data
        attck = data.get('attack')
        combine_tech = data.get('combine_tech')
        res = TechniqueAttack.objects.filter(attack_id=attck, combine_tech_id=combine_tech).delete()
        return JsonResponse(res, safe=False)


@api_view(['GET'])
def get_unique_dec_tech_ids(request):
    all_id_list = list(Technique.objects.values_list('combine_tech_id', flat=True))
    detection_id_list = list(Detection.objects.values_list('sub_technique_id', flat=True))
    unique_id_list = list(set(all_id_list) - set(detection_id_list))
    # print(unique_id_list)
    # a = list(set(y) - set(x))
    return JsonResponse(unique_id_list, safe=False)


@api_view(['PUT'])
def delete_detection_technique(request):

    if request.method == "PUT":
        data = request.data
        # print(data)
        detection = data.get('detection')
        combine_tech = data.get('combine_tech')
        # res = TechniqueDetection.objects.filter(detection_id=detection, combine_tech_id=combine_tech).delete()
        # return JsonResponse(res, safe=False)
        return JsonResponse("In Progress...", safe=False)


@api_view(['PUT'])
def delete_mitigation_technique(request):

    if request.method == "PUT":
        data = request.data
        # print(data)
        mitigate = data.get('mitigate')
        combine_tech = data.get('combine_tech')
        res = TechniqueMitigation.objects.filter(mitigate_id=mitigate, combine_tech_id=combine_tech).delete()
        return JsonResponse(res, safe=False)


@api_view(['GET'])
def export_json(request):

    if request.method == "GET":
        obj = ExportToJson()
        response_json = obj.detection_json()
        return JsonResponse(response_json, safe=False)


@api_view(['GET'])
def get_count(request):
    obj = DashboardCount()
    response_json = obj.all_items_count()
    return JsonResponse(response_json, safe=False)


@api_view(['POST'])
def get_color_info(request):
    # print("data -> ", dir(request))
    if request.method == "POST":
        data = request.data
        # print("data -> ", data)
        res = None
        detection_obj = Detection.objects.get(detection_id=data)
        res = detection_obj.color
        # print("res -> ", res)
        data = {'data': res}
        # if data.detection_obj.exists():
        #     res = data.detection_obj.all()[0].color

        return JsonResponse([data], safe=False)


@api_view(['POST'])
def get_platform_details(request):
    print("data -> ", dir(request))
    if request.method == "POST":
        data = request.data
        data = data.get('data')
        print("data -> ", data)
        res = None
        detection_obj = Technique.objects.get(combine_tech_id=data)
        os_type = detection_obj.os_type
        print("res -> ", os_type)
        data = {'platform': os_type}
        # if data.detection_obj.exists():
        #     res = data.detection_obj.all()[0].color

        return JsonResponse([data], safe=False)


class AttacksViewSet(viewsets.ModelViewSet):
    queryset = Attacks.objects.all()
    # queryset = Attacks.objects.order_by('modify_date').all()
    serializer_class = AttacksSerializer
    # order_by = ['modify_date']


class MitigationViewSet(viewsets.ModelViewSet):
    queryset = Mitigation.objects.all()
    serializer_class = MitigationSerializer


@api_view(['GET'])
def get_unique_ds(request):
    obj = DataSource()
    response_json = obj.unique_datasource()
    return JsonResponse(response_json, safe=False)


# @csrf_exempt
class DetectionViewSet(viewsets.ModelViewSet):
    queryset = Detection.objects.all()
    queryset = Detection.objects.order_by('modify_date').all()
    serializer_class = DetectionSerializer
    order_by = ['modify_date']


class TechniqueMitigationViewSet(viewsets.ModelViewSet):
    lookup_value_regex = '[A-Z0-9.]+'
    queryset = TechniqueMitigation.objects.all()
    serializer_class = TechniqueMitigationSerializer


class TechniqueAttackViewSet(viewsets.ModelViewSet):
    lookup_value_regex = '[A-Z0-9.]+'
    queryset = TechniqueAttack.objects.all()
    serializer_class = TechniqueAttackSerializer

#
# class TechniqueDetectionViewSet(viewsets.ModelViewSet):
#     lookup_value_regex = '[A-Z0-9.]+'
#     queryset = TechniqueDetection.objects.all()
#     serializer_class = TechniqueDetectionSerializer


def index(request):
    return HttpResponse("Hello, You're at the informational index.")
