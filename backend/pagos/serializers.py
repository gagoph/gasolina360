from rest_framework import serializers
from .models import FormaPago, EstacionFormaPago
from estaciones.models import Estacion

class FormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaPago  
        fields = ['id', 'metodo'] 
        read_only_fields = ['id'] 


class EstacionFormaPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstacionFormaPago
        fields = ['id', 'estacion', 'forma_pago']
        read_only_fields = ['id'] 