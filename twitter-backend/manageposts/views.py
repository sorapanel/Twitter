from rest_framework import viewsets
from .models import Post, Image
from .serializers import PostSerializer, ImageSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_fields = ('user',)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_fields = ('post',)
