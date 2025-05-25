from rest_framework import serializers
from .models import Combustible, EstacionCombustible
from estaciones.models import Estacion
from cuentas.models import Usuario

class CombustibleSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Combustible
        fields = ['id', 'tipo']
        read_only_fields = ['id']

class EstacionCombustibleSerializer(serializers.ModelSerializer): 
    class  Meta: 
        model = EstacionCombustible
        fields = ['id', 'estacion', 'combustible', 'disponibilidad', 'fecha_actualizacion', 'usuario_actualizacion']
        read_only_fields = ['id', 'fecha_actualizacion']
