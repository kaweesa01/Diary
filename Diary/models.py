from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class DiaryModel(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateTimeField(auto_now=True)

    textDecoration = models.CharField(max_length=50,default="none")
    fontWeight = models.IntegerField(default=100)
    fontStyle = models.CharField(max_length=50,default='none')

    owner = models.ForeignKey(User, related_name='diary',on_delete=models.CASCADE, null=True)

class ColorModel(models.Model):
    firstcolor = models.CharField(max_length=50 , default="AntiqueWhite")
    secondcolor = models.CharField(max_length=50,default='#ff99cc')
    hsl = models.IntegerField(default=300)
    
    owner = models.ForeignKey(User, related_name='color',on_delete=models.CASCADE, null=True)
