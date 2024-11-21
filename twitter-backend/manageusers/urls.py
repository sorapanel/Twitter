from rest_framework import routers
from .views import UserViewSet
from manageposts.views import PostViewSet
from manageposts.views import ImageViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'manage_user', UserViewSet)
router.register(r'manage_post', PostViewSet)
router.register(r'manage_postimage', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]