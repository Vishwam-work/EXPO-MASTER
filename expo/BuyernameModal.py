from django.db import models

# Buyername Custome model

class CustomeBuyerKey(models.CharField):
    def __init__(self,*args, **kwargs):
        kwargs['max_length'] = 20
        kwargs['unique'] = True
        kwargs['primary_key'] = True
        super().__init__(*args, **kwargs)

class Buyername(models.Model):
    BuyId = CustomeBuyerKey(max_length=20, unique=True, primary_key=True)
    Buyer_name = models.CharField(max_length=150)

    def save(self, *args, **kwargs):
        if not self.BuyId:
            last_object = Buyername.objects.order_by('-BuyId').first()
            if last_object:
                last_key = last_object.BuyId
                prefix = "Buy"
                key_number = int(last_key[len(prefix):]) + 1
            else:
                prefix = "Buy"
                key_number = 1
            self.BuyId = f"{prefix}{key_number}"
        super(Buyername, self).save(*args, **kwargs)