from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.views.generic.base import TemplateView
from . import views

__author__ = "Akash Gaurav"

router = DefaultRouter()
router.register('Technique', views.TechniqueViewSet, basename='Technique')
router.register('Attacks', views.AttacksViewSet, basename='Attacks')
router.register('Tactic', views.TacticViewSet, basename='Tactic')
router.register('Detection', views.DetectionViewSet, basename='Detection')
router.register('Mitigation', views.MitigationViewSet, basename='Mitigation')
router.register('TechniqueMitigation', views.TechniqueMitigationViewSet, basename='TechniqueMitigation')
router.register('TechniqueAttack', views.TechniqueAttackViewSet, basename='TechniqueAttack')
# router.register('TechniqueDetection', views.TechniqueDetectionViewSet, basename='TechniqueDetection')

urlpatterns = [
    # path('', views.index, name='index'),
    path('', include(router.urls)),
    path('id_list/', views.get_technique_ids, name='id_list'),
    path('get_unique_technique_ids/', views.get_unique_technique_ids, name='unique_technique_ids'),
    path('get_unique_dec_tech_ids/', views.get_unique_dec_tech_ids, name='unique_technique_ids'),
    path('delete_attack_technique/', views.delete_attack_technique, name='delete_attack_technique'),
    path('delete_detection_technique/', views.delete_detection_technique, name='delete_detection_technique'),
    path('delete_mitigation_technique/', views.delete_mitigation_technique, name='delete_attack_technique'),
    path('get_color_info/', views.get_color_info, name='get_color_info'),
    path('get_platform_details/', views.get_platform_details, name='platform_details'),
    re_path(r'export_json/(?P<version>[\w \/&-]+)/$', views.export_json, ),
    path('get_count/', views.get_count, name='get_count'),
    path('get_unique_ds/', views.get_unique_ds, name='get_unique_ds'),
    # path('', views.DashboardCount, name='homepage')

]
