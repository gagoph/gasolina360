from django.contrib import admin
from .models import Servicio, TipoServicio, EstacionServicio

# Register your models here.
admin.site.register(Servicio)
admin.site.register(TipoServicio)
admin.site.register(EstacionServicio)