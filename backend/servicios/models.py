from django.db import models
from estaciones.models import Estacion

# Create your models here.
class TipoServicio(models.Model): 
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre
    
class Servicio(models.Model):
    tipo_servicio = models.ForeignKey(TipoServicio, on_delete=models.CASCADE, related_name='servicios')
    nombre = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_servicio.nombre}" if not self.nombre else f"{self.tipo_servicio.nombre} - {self.nombre}"
    
class EstacionServicio(models.Model): 
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE, related_name="servicios_estacion")
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name="estaciones_servicio")
    horario = models.CharField(max_length=100, blank=True, null=True)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta: 
        unique_together = ('estacion', 'servicio')

    def __str__(self):
        return f"{self.servicio.nombre} en {self.estacion.nombre}"