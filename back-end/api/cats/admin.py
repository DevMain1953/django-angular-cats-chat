from django.contrib import admin


from .models import Cat, Message

admin.site.register(Cat)
admin.site.register(Message)