from Diary.models import DiaryModel, ColorModel
from rest_framework import viewsets, permissions
from .serializers import DiarySerializer,ColorSerializer

# Diary view set

class DiaryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = DiarySerializer

    def get_queryset(self):
        return self.request.user.diary.all().order_by('-date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ColorViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ColorSerializer

    def get_queryset(self):
        return self.request.user.color.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)