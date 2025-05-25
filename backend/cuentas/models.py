from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Usuario(AbstractUser): 
    #Se hereda username y password de django AbstractUser
    verificado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    
class Rol(models.Model): 
    nombre_rol = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre_rol
    
class UsuarioRol(models.Model): 
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_roles')
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name='rol_usuarios')

    class Meta: 
        unique_together = ('usuario', 'rol')

    def __str__(self):
        return f"{self.usuario.username} - {self.rol.nombre_rol}"