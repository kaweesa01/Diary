from rest_framework import serializers
from Diary.models import DiaryModel, ColorModel

# Diary serilaizer
class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryModel
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorModel
        fields = '__all__'