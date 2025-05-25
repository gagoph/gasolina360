from django.db import models
from cuentas.models import Usuario
from estaciones.models import Estacion

# Create your models here.
class Combustible(models.Model):
    tipo = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return self.tipo
    
class EstacionCombustible(models.Model):
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE, related_name='combustibles')
    combustible = models.ForeignKey(Combustible, on_delete=models.CASCADE, related_name='estaciones')
    disponibilidad = models.BooleanField(default=False)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    usuario_actualizacion = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('estacion', 'combustible')

    def __str__(self):
        estado = "Disponible" if self.disponibilidad else "Agotado"
        return f"{self.estacion.nombre} - {self.combustible.tipo} ({estado})"
    
    

    