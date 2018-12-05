import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key='AIzaSyAzOGcqN1rq2PgdYgiNHFV089pXKJ-2L1o')

# Request directions via public transit
now = datetime.now()
directions_result = gmaps.directions("Sydney Town Hall",
                                     "Parramatta, NSW",
                                     mode="transit",
                                     departure_time=now)