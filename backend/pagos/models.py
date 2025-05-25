from django.db import models
from estaciones.models import Estacion

# Create your models here.
class FormaPago(models.Model): 
    metodo = models.CharField(max_length=45, unique=True, null=False, blank=False)

    def __str__(self):
        return self.metodo
    
class EstacionFormaPago(models.Model):
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE)
    forma_pago = models.ForeignKey(FormaPago, on_delete=models.CASCADE)

    class Meta: 
        unique_together = ('estacion', 'forma_pago')

    def __str__(self):
        return f"{self.estacion.nombre} - {self.forma_pago.metodo}"