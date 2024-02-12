from django.db import models

# Buyername Custome model

class CustomeNotifykey(models.CharField):
    def __init__(self,*args, **kwargs):
        kwargs['max_length'] = 20
        kwargs['unique'] = True
        kwargs['primary_key'] = True
        super().__init__(*args, **kwargs)

class NotifyName(models.Model):
    NotiKey = CustomeNotifykey(max_length=20, unique=True, primary_key=True)
    Notify_name = models.CharField(max_length=150)

    def save(self, *args, **kwargs):
        if not self.NotiKey:
            last_object = NotifyName.objects.order_by('-NotiKey').first()
            if last_object:
                last_key = last_object.NotiKey
                prefix = "Noti"
                key_number = int(last_key[len(prefix):]) + 1
            else:
                prefix = "Noti"
                key_number = 1
            self.NotiKey = f"{prefix}{key_number}"
        super(NotifyName, self).save(*args, **kwargs)