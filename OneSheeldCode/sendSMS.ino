#define CUSTOM_SETTINGS 
#define INCLUDE_SMS_SHIELD
#define INCLUDE_TERMINAL_SHIELD

#include <OneSheeld.h>
int x = 0;
void setup() {
  // put your setup code here, to run once:
  OneSheeld.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  String number= "0851933899" ;
  // chris phone num -> String number= "0864530479" ;
  String message= "are you still having fun" ;

  Terminal.print(message);
  SMS.send(number,message);
  x++;
  
}
