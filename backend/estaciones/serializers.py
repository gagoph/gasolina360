from rest_framework import serializers
from estaciones.models import Estacion
from cuentas.models import Usuario

class EstacionSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Estacion
        fields = ['id', 'rif', 'nombre', 'ubicacion', 'telefono', 'horario_operacion', 'cantidad_dispensadores', 'id_encargado_registro', 'activa', 'fecha_registro']
        read_only_fields = ['id', 'fecha_registro']

    