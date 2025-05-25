from django.db import models
from cuentas.models import Usuario

# Create your models here.
class Estacion(models.Model): 
    rif = models.CharField(max_length=13, unique=True)
    nombre = models.CharField(max_length=255)
    ubicacion = models.TextField()
    telefono = models.CharField(max_length=11, blank=True, null=True)
    horario_operacion = models.CharField(max_length=255)
    cantidad_dispensadores = models.IntegerField()
    id_encargado_registro = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name="estaciones_registradas")
    activa = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.rif})"