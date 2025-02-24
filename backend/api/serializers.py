from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        style={"input_type": "password"}
    )
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "name", 
            "password",
            ]

    def create(self, validated_data):
        """Cria um novo usuário e define a senha corretamente"""
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        """Atualiza usuário e faz hash da senha se fornecida"""
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance