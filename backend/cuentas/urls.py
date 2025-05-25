from rest_framework import routers
from django.urls import path, include
from .views import UsuarioViewSet, RolViewSet, UsuarioRolViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'roles', RolViewSet)
router.register(r'usuario-roles', UsuarioRolViewSet)

urlpatterns = [
    path('', include(router.urls))
]
