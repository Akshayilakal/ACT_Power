# ACT Backend

Application stores sensor data

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

A step by step series of examples that tell you how to get a development env running

install docker and docker compose refer link below

```
https://docs.docker.com/compose/install/
```

go to project directory where docker-compose.yml file exist run the below command

```
docker-compose up -d --build
```

or 
```
sudo docker-compose up -d --build
```

check for logs

```
sudo docker-compose logs -f
```

Navigate to below link 
```
http://127.0.0.1:8000/admin/
```

```
username:admin
password:admin123
```

## API document

Use Postman or commands to access API's

1)Create Sensor data
requestType: POST
url: http://127.0.0.1:8000/sensor/
body:{
	"reading": 15.0, 
	"timestamp": 1574826449, 
	"sensorType": "Current"
     }
response:{
	"reading": 15.0, 
	"timestamp": 1574826449, 
	"sensorType": "Current"
     }

Example:
```
curl -d '{"reading": 15.0, "timestamp": 1574826449, "sensorType": "Current"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:8000/sensor/
```

2)Get Sensor data
requestType: GET
url: http://127.0.0.1:8000/sensor/?from_date=2019-11-20&to_date=2019-11-28&sensorType=Current
response: {"data_set": [{"id": 13, "reading": "26.00", "timestamp": "2019-11-27T03:47:29Z", "sensorType": "Current"}, {"id": 14, "reading": "15.00", "timestamp": "2019-11-27T03:47:29Z", "sensorType": "Current"}], "max_value": {"id": 13, "reading": "26.00", "timestamp": "2019-11-27T03:47:29Z", "sensorType": "Current"}, "min_value": {"id": 14, "reading": "15.00", "timestamp": "2019-11-27T03:47:29Z", "sensorType": "Current"}, "mean": "20.50"}

Example:
```
curl -H "Content-Type: application/json" -X GET 'http://127.0.0.1:8000/sensor/?from_date=2019-11-20&to_date=2019-11-28&sensorType=Current'
```

