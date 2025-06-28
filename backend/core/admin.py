from django.contrib import admin
from .models import ZakahCalculation, ZakahTransaction, Asset
# Register your models here.

admin.site.register(ZakahCalculation)
admin.site.register(ZakahTransaction)
admin.site.register(Asset)
