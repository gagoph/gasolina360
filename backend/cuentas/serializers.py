from rest_framework import serializers
from .models import Usuario, Rol, UsuarioRol

class RolSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Rol
        fields = ['id', 'nombre_rol']

class UsuarioSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Usuario
        fields = ['id', 'username', 'verificado', 'fecha_creacion']

class UsuarioRolSerializer(serializers.ModelSerializer): 
    usuario = UsuarioSerializer(read_only=True)
    rol = RolSerializer(read_only=True)

    class Meta: 
        model = UsuarioRol
        fields = ['id', 'usuario', 'rol']