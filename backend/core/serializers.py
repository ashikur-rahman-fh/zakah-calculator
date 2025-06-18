import calendar
from rest_framework import serializers
from .models import ZakahCalculation, ZakahTransaction
from django.db.models import Sum

from .utils import index_to_month, month_to_index

class ZakahYearSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='pk')
    year = serializers.IntegerField()
    month = serializers.SerializerMethodField()
    zakah = serializers.DecimalField(source='total_amount', max_digits=12, decimal_places=2)
    paid = serializers.SerializerMethodField()

    class Meta:
        model = ZakahCalculation
        fields = ['id', 'year', 'month', 'zakah', 'paid']

    def get_month(self, obj):
        return index_to_month(obj.month)

    def get_paid(self, obj):
        return obj.transactions.aggregate(total_paid=Sum('amount'))['total_paid'] or 0


class TransactionSerializer(serializers.ModelSerializer):
    to = serializers.CharField(source='paid_to')
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    date = serializers.DateField(source='payment_date')
    method = serializers.CharField(source='payment_method')
    description = serializers.CharField()

    class Meta:
        model = ZakahTransaction
        fields = ['to', 'amount', 'date', 'method', 'description']

# serializers.py

class ZakahCalculationCreateSerializer(serializers.ModelSerializer):
    month = serializers.CharField()

    class Meta:
        model = ZakahCalculation
        fields = ['year', 'month', 'total_amount', 'calculation_breakdown']
        extra_kwargs = {
            'calculation_breakdown': {'required': True},
            'total_amount': {'required': True},
            'year': {'required': True},
            'month': {'required': True}
        }

    def validate_month(self, value):
        try:
            month_int = month_to_index(value)
            return month_int
        except ValueError as e:
            raise serializers.ValidationError(str(e))

    def create(self, validated_data):
        return ZakahCalculation.objects.create(**validated_data)
