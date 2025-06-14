from django.urls import path, include
from rest_framework import routers
from .views import TipoServicioViewSet, ServicioViewSet, EstacionServicioViewSet

router = routers.DefaultRouter()
router.register(r'tipos-servicio', TipoServicioViewSet)
router.register(r'estacion-servicios', EstacionServicioViewSet)
router.register(r'', ServicioViewSet)  # <-- Esto debe ir al final

urlpatterns = [
    path('', include(router.urls)),
]