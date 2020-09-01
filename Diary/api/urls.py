from rest_framework import routers
from .api import DiaryViewSet,ColorViewSet

router = routers.DefaultRouter()
router.register('api/diary', DiaryViewSet, 'diary')
router.register('api/color', ColorViewSet, 'color')

urlpatterns = router.urls
