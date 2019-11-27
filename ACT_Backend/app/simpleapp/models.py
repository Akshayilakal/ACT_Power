from django.db import models

# Create your models here.

class SensorData(models.Model):
    reading = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField()
    sensorType = models.CharField(max_length=100)

    def __str__(self):
        return str(
            str(self.reading) + ' ' + self.sensorType + ' ' + str(self.timestamp)
        )