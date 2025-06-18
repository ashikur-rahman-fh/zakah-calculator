from django.shortcuts import render

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .services import ZakahService, TransactionService
from .serializers import ZakahYearSerializer, TransactionSerializer, ZakahCalculationCreateSerializer

from .utils import month_to_index

class ZakahYearListAPIView(APIView):
    """
    Returns list of zakah years with calculated paid amount.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        zakah_calculations = ZakahService.get_all_zakah_calculations()
        serializer = ZakahYearSerializer(zakah_calculations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ZakahTransactionByYearAPIView(APIView):
    """
    Get all zakah transactions for a given year. Frontend-optimized format.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        year = request.query_params.get('year')
        if not year:
            return Response({'error': 'Year query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            year = int(year)
        except ValueError:
            return Response({'error': 'Year must be an integer'}, status=status.HTTP_400_BAD_REQUEST)

        transactions = TransactionService.get_transactions_by_year(year)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ZakahCalculationCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ZakahCalculationCreateSerializer(data=request.data)
        if serializer.is_valid():
            zakah = serializer.save()
            return Response({
                "id": zakah.id,
                "year": zakah.year,
                "month": zakah.month,
                "zakah": zakah.total_amount
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
