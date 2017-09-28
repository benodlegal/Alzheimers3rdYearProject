
#define CUSTOM_SETTINGS
#define INCLUDE_TERMINAL_SHIELD
#define INCLUDE_GPS_SHIELD
#define INCLUDE_INTERNET_SHIELD

#include <OneSheeld.h>

double lat = GPS.getLatitude();
double lon = GPS.getLongitude();
HttpRequest myRequest("https://test-9a961.firebaseio.com/");   		

void setup() 
{
  /* Start communication. */
  OneSheeld.begin();
}


void sendToServer(double &x, double &y){
	Terminal.println(x);
	// Need to add code that would send location here 
	// Have No idea whats going on TBH 
	// We need to learn how to send HTTP requests 
    OneSheeld.delay(60000*5);
    
}

void loop()
{
		//Getting latitude
		lat = GPS.getLatitude();
		lon = GPS.getLongitude();
   		//Terminal.println(lat);
   		//Terminal.println(lon);
   		sendToServer(lat, lon);
}

