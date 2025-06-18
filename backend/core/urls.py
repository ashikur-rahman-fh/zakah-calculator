from django.urls import path
from .views import ZakahYearListAPIView, ZakahTransactionByYearAPIView

urlpatterns = [
    path('api/zakah-years/', ZakahYearListAPIView.as_view(), name='zakah-year-list'),
    path('api/zakah-transactions/', ZakahTransactionByYearAPIView.as_view(), name='zakah-transactions-by-year'),
]
