#define CUSTOM_SETTINGS
#define INCLUDE_INTERNET_SHIELD
#define INCLUDE_GPS_SHIELD
#define INCLUDE_TERMINAL_SHIELD
float lat;
float lng;

char strlat[64];
char strlng[64];

float fenceLat;
float fenceLng;
int fenceRadius;
 
#include <OneSheeld.h>
HttpRequest latGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/Location/lat.json");
HttpRequest lngGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/Location/lng.json");

HttpRequest fenceLatGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/GeoFence/lat.json");
HttpRequest fenceLngGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/GeoFence/lng.json");
HttpRequest radiusGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/GeoFence/radius.json");  
void setup() {
  OneSheeld.begin();
  
  latGet.setContentType("application/json");
  lngGet.setContentType("application/json");
  
  fenceLatGet.setContentType("application/json");
  fenceLngGet.setContentType("application/json");
  radiusGet.setContentType("application/json");
  
  fenceLatGet.setOnSuccess(&geoLatReply);
  fenceLngGet.setOnSuccess(&geoLngReply);
  radiusGet.setOnSuccess(&radiusReply);
}

void loop() {
  lat = GPS.getLatitude();
  lng = GPS.getLongitude();
  dtostrf(lat, 3, 7, strlat);  
  dtostrf(lng, 3, 7, strlng);  
  latGet.addRawData(strlat);
  lngGet.addRawData(strlng);
  Internet.performPut(latGet);
  Internet.performPut(lngGet);
  
  Internet.performGet(fenceLatGet);
  Internet.performGet(fenceLngGet);
  Internet.performGet(radiusGet);
}

void geoLatReply(HttpResponse &returnedResponse){
  sscanf(returnedResponse.getBytes(), "%f", &fenceLat);
  Terminal.println(fenceLat);
}

void geoLngReply(HttpResponse &returnedResponse){
  sscanf(returnedResponse.getBytes(), "%f", &fenceLng);
  Terminal.println(fenceLng);
}

void radiusReply(HttpResponse &returnedResponse){
  sscanf(returnedResponse.getBytes(), "%d", &fenceRadius);
  Terminal.println(fenceRadius);
}

