from django.db import models
from manageusers.models import CustomUser

# Create your models here.
class Post(models.Model):
    text = models.CharField(max_length=300, null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    add_at = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='post_images/')