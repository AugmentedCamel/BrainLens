
// A flag to ensure it runs only once
var hasStarted = false;

// Awake function that's triggered once
function awake() {
    if (!hasStarted) {
        hasStarted = true; // Set the flag to prevent future calls
        global.startVoiceMLTranscribe(callback); // Start transcription
        print("log started")
    }
}

function callback(eventArgs){
    // intermediate transcription
    if(eventArgs.transcription.trim() == "") return;
    print(eventArgs.transcription);
    if (eventArgs.transcription == "time") {
        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 2);
        global.getTTSResults("The time is: " + global.localizationSystem.getTimeFormatted(currentDate));
        print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));
    }
    if (eventArgs.transcription == "Time") {
        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 2);
        global.getTTSResults("The time is: " + global.localizationSystem.getTimeFormatted(currentDate));
        print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));
    }
    // final transcription
    if(!eventArgs.isFinalTranscription) return;
    print("Final Transcription: " + eventArgs.transcription);
}

awake();