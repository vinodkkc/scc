from rest_framework import serializers
from .models import Tactic, Technique, Attacks, Detection, Mitigation, \
    TechniqueMitigation, TechniqueAttack   #, TechniqueDetection


class TacticSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tactic
        fields = "__all__"


class TechniqueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Technique
        fields = "__all__"


class AttacksSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attacks
        fields = "__all__"


class DetectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detection
        fields = "__all__"


class MitigationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mitigation
        fields = "__all__"


class TechniqueMitigationSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechniqueMitigation
        fields = "__all__"


class TechniqueAttackSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechniqueAttack
        fields = "__all__"


# class TechniqueDetectionSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = TechniqueDetection
#         fields = "__all__"
