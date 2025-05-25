from rest_framework import routers
from django.urls import path, include
from .views import CombustibleViewSet, EstacionCombustibleViewSet

router = routers.DefaultRouter()
router.register(r'', CombustibleViewSet)
router.register(r'estacion-combustible', EstacionCombustibleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]