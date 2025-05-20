from django.contrib import admin
from .models import Note
# Register your models here.

# Register the Note model with the Django admin site
admin.site.register(Note)