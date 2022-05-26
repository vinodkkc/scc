from django.contrib import admin
from .models import Tactic, Technique, Attacks, Detection, Mitigation, \
    TechniqueAttack, TechniqueMitigation    #   , TechniqueDetection

# Register your models here.
admin.site.register(Tactic)
admin.site.register(Technique)
admin.site.register(Attacks)
admin.site.register(Detection)
admin.site.register(Mitigation)
admin.site.register(TechniqueAttack)
# admin.site.register(TechniqueDetection)
admin.site.register(TechniqueMitigation)
