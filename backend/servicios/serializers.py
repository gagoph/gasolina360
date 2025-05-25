from rest_framework import serializers
from .models import TipoServicio, Servicio, EstacionServicio
from estaciones.models import Estacion

class TipoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServicio
        fields = ['id', 'nombre']
        read_only_fields = ['id']

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'tipo_servicio', 'nombre', 'descripcion']
        read_only_fields = ['id']

class EstacionServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstacionServicio
        fields = ['id', 'estacion', 'servicio', 'horario', 'contacto', 'activo', 'fecha_registro']
        read_only_fields = ['id', 'fecha_registro']
