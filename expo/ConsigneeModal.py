from django.db import models

# Consignee Custome model

class CustomConsigneeKey(models.CharField):
    def __init__(self,*args, **kwargs):
        kwargs['max_length'] = 20
        kwargs['unique'] = True
        kwargs['primary_key'] = True
        super().__init__(*args, **kwargs)

class Consignee(models.Model):
    ConId = CustomConsigneeKey(max_length=20, unique=True, primary_key=True)
    Con_Name = models.CharField(max_length=150)

    def save(self, *args, **kwargs):
        if not self.ConId:
            last_object = Consignee.objects.order_by('-ConId').first()
            if last_object:
                last_key = last_object.ConId
                prefix = "Con"
                key_number = int(last_key[len(prefix):]) + 1
            else:
                prefix = "Con"
                key_number = 1
            self.ConId = f"{prefix}{key_number}"
        super(Consignee, self).save(*args, **kwargs)