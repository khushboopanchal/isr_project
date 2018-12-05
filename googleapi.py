import urllib.request
import json
endpoint = 'https://maps.googleapis.com/maps/api/directions/json'
api_key = 'AIzaSyAzOGcqN1rq2PgdYgiNHFV089pXKJ-2L1o'
origin = input('Where are you?').replace(' ','+')
destination = input('Where do you want to go?').replace(' ','+')

nav_request = 'origin=()&destination=()&key=()'.format(origin,destination,api_key)
request = endpoint + nav_request
response = urllib.request.urlopen(request).read()
directions = json.loads(response)
print(directions)