from django.db import models

WOOL_TYPES = [("long", "Длинношёрстая"), ("short", "Короткошёрстая"), ("bald", "Лысая")]


class Cat(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    breed = models.CharField(max_length=100)
    wool_type = models.CharField(choices=WOOL_TYPES, max_length=100)
    owner = models.ForeignKey("auth.User", related_name="cats", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def get_wool_type_display(self):
        return dict(WOOL_TYPES)[self.wool_type]

    class Meta:
        verbose_name_plural = "cats"
    

class Message(models.Model):
    sender = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.message

    class Meta:
        verbose_name_plural = "messages"