from django.shortcuts import render
from rest_framework import viewsets
from .models import FormaPago, EstacionFormaPago
from .serializers import FormaPagoSerializer, EstacionFormaPagoSerializer

# Create your views here.
class FormaPagoViewSet(viewsets.ModelViewSet): 
    queryset = FormaPago.objects.all()
    serializer_class = FormaPagoSerializer

class EstacionFormaPagoViewSet(viewsets.ModelViewSet): 
    queryset = EstacionFormaPago.objects.all()
    serializer_class = EstacionFormaPagoSerializer