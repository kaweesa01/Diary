from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from Diary.models import ColorModel

# User seriaizer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('id','username','email')

# Register serializer
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password':{'write_only':True},'email':{'required':True}}

    def create(self,validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        color = ColorModel.objects.create(owner=user, firstcolor='AntiqueWhite',secondcolor='#ff99cc',hsl=300)
        return user


# LoginSerializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
      user = authenticate(**data)
      if user and user.is_active:
        return user
      raise serializers.ValidationError('Incorrect Credentials')

