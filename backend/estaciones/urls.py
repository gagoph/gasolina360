from django.urls import path, include
from rest_framework import routers
from .views import  EstacionViewSet

router = routers.DefaultRouter()
router.register(r'', EstacionViewSet)

urlpatterns = [
    path('', include(router.urls))
]