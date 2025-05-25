from django.contrib import admin
from .models import Usuario, Rol, UsuarioRol

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Rol)
admin.site.register(UsuarioRol)