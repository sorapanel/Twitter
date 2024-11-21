from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

# Create your models here.
class CustomUser(AbstractUser):
    phone_num = models.CharField(max_length=15, unique=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    email = models.EmailField(blank=True, null=True, unique=True)

    def clean(self):
        super().clean()
        # emailかphone_numのどちらかが空の場合、ValidationErrorを発生させる
        if not self.email and not self.phone_num:
            raise ValidationError(_('Either email or phone number must be provided.'))