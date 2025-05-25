from django.urls import path, include
from rest_framework import routers
from .views import FormaPagoViewSet, EstacionFormaPagoViewSet

router = routers.DefaultRouter()
router.register(r'formas-pago', FormaPagoViewSet)
router.register(r'estacion-formas-pago', EstacionFormaPagoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]