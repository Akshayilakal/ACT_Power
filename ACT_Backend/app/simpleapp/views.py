from .models import SensorData
from .serializers import SensorSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
import datetime
from django.forms.models import model_to_dict
import itertools

# Create your views here.

class SensorView(APIView):
    """
    List all code sensordata, or create a new sensor data.
    """
    def get(self, request):
        if not request.GET.get('from_date'):
            from_date = datetime.datetime.strptime(str(datetime.date.today())+'  00:00:00', '%Y-%m-%d %H:%M:%S')
        else:
            from_date = datetime.datetime.strptime(request.GET.get('from_date')+'  00:00:00', '%Y-%m-%d %H:%M:%S')
        if not request.GET.get('to_date'):
            to_date = datetime.datetime.strptime(str(datetime.date.today())+'  23:59:59', '%Y-%m-%d %H:%M:%S')
        else:
            to_date = datetime.datetime.strptime(request.GET.get('to_date')+'  23:59:59', '%Y-%m-%d %H:%M:%S')
        books = SensorData.objects.filter(timestamp__range=[from_date,to_date], sensorType = request.GET.get('sensorType'))
        serializer = SensorSerializer(books, many=True)
        resp_dict = {
                       "data_set":serializer.data,
                       "max_value":model_to_dict(books.order_by('-reading')[0]),
                       "min_value":model_to_dict(books.order_by('reading')[0]),
                       "mean": sum([ sub.reading for sub in books ]) / len(books)
                    }
        return JsonResponse(resp_dict, safe=False)

    def post(self, request):
        data = request.data
        data['timestamp'] = datetime.datetime.fromtimestamp(data['timestamp']).strftime('%Y-%m-%d %H:%M:%S')
        serializer = SensorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class SensorType(APIView):
    """
    List all code sensordata, or create a new sensor data.
    """
    def get(self, request):
        sensor = SensorData.objects.values_list('sensorType').distinct()
        return JsonResponse(list(itertools.chain(*sensor)), safe=False)
