from django.shortcuts import render
from rest_framework import viewsets
from .models import Estacion
from .serializers import EstacionSerializer

# Create your views here.
class EstacionViewSet(viewsets.ModelViewSet): 
    queryset = Estacion.objects.all()
    serializer_class = EstacionSerializer