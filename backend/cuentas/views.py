from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Rol, UsuarioRol
from .serializers import UsuarioSerializer, RolSerializer, UsuarioRolSerializer

# Create your views here.
class UsuarioViewSet(viewsets.ModelViewSet): 
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ModelViewSet): 
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class UsuarioRolViewSet(viewsets.ModelViewSet): 
    queryset = UsuarioRol.objects.all()
    serializer_class = UsuarioRolSerializer