from django.urls import path
from .views import ZakahYearListAPIView, ZakahTransactionByYearAPIView, \
                ZakahCalculationCreateAPIView, ZakahTransactionCreateAPIView

urlpatterns = [
    path('api/zakah-years/', ZakahYearListAPIView.as_view(), name='zakah-year-list'),
    path('api/zakah-transactions/', ZakahTransactionByYearAPIView.as_view(), name='zakah-transactions-by-year'),
    path('api/zakah-years/create/', ZakahCalculationCreateAPIView.as_view(), name='zakah-create'),
    path('api/zakah-transactions/create/', ZakahTransactionCreateAPIView.as_view(), name='zakah-transaction-create'),
]
