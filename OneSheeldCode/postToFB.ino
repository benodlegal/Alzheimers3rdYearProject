#define CUSTOM_SETTINGS 
#define INCLUDE_VOICE_RECOGNIZER_SHIELD
#define INCLUDE_TERMINAL_SHIELD
String postToFB = "facebook";
#include <OneSheeld.h>
void setup() {
  // put your setup code here, to run once:
  OneSheeld.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  if(VoiceRecognition.isNewCommandReceived()){
     String command = VoiceRecognition.getCommandAsString();

     if(postToFB.equalsIgnoreCase(command)){
        Terminal.println("ayy");
      }
    }
}


