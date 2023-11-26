from django.contrib.auth.models import User
from .models import Cat, Message
from .serializers import CatSerializer, UserSerializer, MessageSerializer
from .permissions import IsOwner, IsAnonymous
from rest_framework import generics, status, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response


class CatList(generics.ListCreateAPIView):
    serializer_class = CatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cat.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CatDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    permission_classes = [IsOwner]


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAnonymous]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({"detail": "Successfully registered."}, status=status.HTTP_201_CREATED)
        return response


class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [IsAnonymous]
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = request.user
            if user.is_authenticated:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
        return response


class LogoutUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.auth.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


class MessageList(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer