// -----JS CODE-----
global.startVoiceMLTranscribe(callback);

//@input bool transcripitonText 
//@input Component.Text screenTextTranscription {"showIf":"transcripitonText", "label": "Transcription text component"}
var latestTranscription = "";

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
    setFinalTranscription(eventArgs.transcription);
    print("Final BAD Transcription: " + eventArgs.transcription);
    script.screenTextTranscription.text = eventArgs.transcription;
}

function setFinalTranscription(text){
    latestTranscription = text;
}

function getFinalTranscription(){
    return latestTranscription;
}

script.api.getFinalTranscription = getFinalTranscription;