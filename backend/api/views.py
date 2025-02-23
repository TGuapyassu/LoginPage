from rest_framework import viewsets, permissions
from .models import CustomUser
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.serializers import TokenVerifySerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.action == 'destroy':
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_staff:
            return CustomUser.objects.filter(id=user.id)
        return super().get_queryset()

class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        serializer = TokenVerifySerializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            return Response({"success": True, "message": "Token is valid"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": "Token is invalid", "error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)