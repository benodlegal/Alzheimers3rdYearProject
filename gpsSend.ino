#define CUSTOM_SETTINGS
#define INCLUDE_INTERNET_SHIELD
#define INCLUDE_GPS_SHIELD
#define INCLUDE_TERMINAL_SHIELD
 
#include <OneSheeld.h>
float lat;
float lng;
float fenceLat;
float fenceLng;
double fenceRadius;
int ledPin = 13;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  OneSheeld.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

  HttpRequest radiusGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/GeoFence/radius.json");
  Internet.performGet(radiusGet);
  fenceRadius = radiusGet;
 // Terminal.print(Internet.getResponse(radiusGet));

  lat = GPS.getLatitude();
  lng = GPS.getLongitude();

  char strlat[64];
  char strlng[64];
  
  dtostrf(lat, 3, 7, strlat);  
  dtostrf(lng, 3, 7, strlng);  
  
  HttpRequest latGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/Location/lat.json");
  HttpRequest lngGet("https://alzheimers-project.firebaseio.com/Patients/Patient1/Location/lng.json");
  
  latGet.addRawData(strlat);
  lngGet.addRawData(strlng);
  
  latGet.setContentType("application/json");
  lngGet.setContentType("application/json");
  
  Internet.performPut(latGet);
  Internet.performPut(lngGet);
}

  //oneSheeld.addRawData("{\"lat\":80, \"lng\":50}");

  /*char test[1024];
  strcpy(test,"{\"lat\":");
  strcat(test,strlat);
  strcat(test,", \"lng\":");
  strcat(test,strlat);
  strcat(test,"}");*/

    /*lat = GPS.getLatitude();
  lng = GPS.getLongitude();
  Terminal.println(lat);*/
