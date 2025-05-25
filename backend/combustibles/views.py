from django.shortcuts import render
from rest_framework import viewsets
from .models import Combustible, EstacionCombustible
from.serializers import CombustibleSerializer, EstacionCombustibleSerializer

# Create your views here.
class CombustibleViewSet(viewsets.ModelViewSet): 
    queryset = Combustible.objects.all()
    serializer_class = CombustibleSerializer

class EstacionCombustibleViewSet(viewsets.ModelViewSet): 
    queryset = EstacionCombustible.objects.all()
    serializer_class = EstacionCombustibleSerializer