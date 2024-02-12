from rest_framework import serializers
from .models import PerformaDoc
class PerformaDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformaDoc
        fields = ('firstName','lastName','username','city','state','zip','terms')