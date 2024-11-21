from rest_framework import serializers
from .models import Post, Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'post')

class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True) 

    class Meta:
        model = Post
        fields = ('id', 'text', 'user', 'add_at', 'images')
