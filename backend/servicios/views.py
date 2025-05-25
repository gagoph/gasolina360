from django.shortcuts import render
from rest_framework import viewsets
from .models import TipoServicio, Servicio, EstacionServicio
from .serializers import TipoServicioSerializer, ServicioSerializer, EstacionServicioSerializer

# Create your views here.
class TipoServicioViewSet(viewsets.ModelViewSet):
    queryset = TipoServicio.objects.all()
    serializer_class = TipoServicioSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class EstacionServicioViewSet(viewsets.ModelViewSet):
    queryset = EstacionServicio.objects.all()
    serializer_class = EstacionServicioSerializer