from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import routers

class WelcomeView(APIView):
    def get(self, request):
        return Response({
            "application": "Zakah Calculator API",
            "version": "1.0.0",
            "status": "operational",
            "description": (
                "Accurately calculate, track, and manage their zakah obligations in accordance with Islamic principles."
            ),
            "metadata": {
                "timezone": str(request.timezone) if hasattr(request, "timezone") else "UTC",
                "client_ip": request.META.get("REMOTE_ADDR", "unknown"),
                "request_id": request.META.get("HTTP_X_REQUEST_ID", "not_provided")
            }
        }, status=200)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "name": request.user.username,
            "email": request.user.email,
        })
