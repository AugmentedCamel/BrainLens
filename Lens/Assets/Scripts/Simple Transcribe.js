// -----JS CODE-----
// Max van Leeuwen
//
// Simple audio transcribing module, call
// 	global.startVoiceMLTranscribe(<callback function>).
//
// Results are sent to the given callback function. If none was given, the following example will be used:
// THanks Max and Xulipa, greetings Camel

function exampleCallback(eventArgs){
    // intermediate transcription
    if(eventArgs.transcription.trim() == "") return;
    print(eventArgs.transcription);

    // final transcription
    if(!eventArgs.isFinalTranscription) return;
    print("Final Transcription: " + eventArgs.transcription);

    script.screenTextTranscription.text = eventArgs.transcription;
    print("Transcription received: " + eventArgs.transcription);
    triggerBehaviors(script.onFinalTranscriptionTriggeredGlobalBehaviors);
}

//@ui {"widget":"label"}
//@input Asset.VoiceMLModule vmlModule

//@ui {"widget":"label"}
//@input string[] boosts
//@input float boostsAmount {"min":1, "max":10}

//@input bool transcripitonText 
//@input Component.Text screenTextTranscription {"showIf":"transcripitonText", "label": "Transcription text component"}

//@ui {"widget":"separator"}
//@input bool editBehaviors {"label": "Edit Behaviors"}
//@ui {"widget":"group_start", "label":"Voice Event Behaviors", "showIf":"editBehaviors"}
//@input bool debug
//@input Component.ScriptComponent[] onListeningEnabledGlobalBehaviors {"label":"On Listening Enabled"}
//@input Component.ScriptComponent[] onListeningDisabledGlobalBehaviors {"label":"On Listening Disabled"}
//@input Component.ScriptComponent[] onListeningTriggeredGlobalBehaviors {"label":"On Listening Triggered"}
//@input Component.ScriptComponent[] onErrorTriggeredGlobalBehaviors {"label":"On Error Triggered"}
//@input Component.ScriptComponent[] onFinalTranscriptionTriggeredGlobalBehaviors {"label":"On Final Transcription Triggered"}
//@ui {"widget":"label","showIf":"useKeyword", "label":"NOTE: On Keyword Detected will be triggered"}
//@ui {"widget":"label","showIf":"useKeyword", "label":"for all the keywords. For single keyword trigger,"}
//@ui {"widget":"label","showIf":"useKeyword", "label":"please check the Send Trigger in each keyword"}
//@ui {"widget":"label","showIf":"useKeyword", "label":"child under Keywords Object"}
//@ui {"widget":"separator","showIf":"useKeyword"}
//@input Component.ScriptComponent[] onKeywordTriggeredGlobalBehaviors {"showIf":"useKeyword", "label":"On Keyword Detected"}
//@ui {"widget":"label","showIf":"useCommand", "label":"NOTE: On Command Detected will be triggered"}
//@ui {"widget":"label","showIf":"useCommand", "label":"for all the commands. For single command trigger,"}
//@ui {"widget":"label","showIf":"useCommand", "label":"please check the functions in the CommandHandler"}
//@ui {"widget":"label","showIf":"useCommand", "label":"Script Component"}
//@ui {"widget":"separator","showIf":"useCommand"}
//@input Component.ScriptComponent[] onCommandTriggeredGlobalBehaviors {"showIf":"useCommand", "label":"On Command Detected"}
//@input Component.ScriptComponent[] onVoiceSystemCommandTriggeredGlobalBehaviors {"showIf":"useSYSTEM_VOICE_COMMAND", "label":"On System Voice Command Detected"}
//@ui {"widget":"group_end"}



function triggerBehaviors(behaviors) {
    if (!behaviors) {
        return;
    }

    for (var i=0; i<behaviors.length; i++) {
        if (behaviors[i] && behaviors[i].api.trigger) {
            behaviors[i].api.trigger();
        } else {
            print("WARNING: please assign the Behavior Script Component");
        }

    }

}


global.startVoiceMLTranscribe = function(callback){
    print("global.startVoiceMLTranscribe");
    if(!callback) callback = exampleCallback;

    var options = VoiceML.ListeningOptions.create();

    var onListeningEnabledHandler = function(){
        script.vmlModule.startListening(options);
    };

    var onListeningDisabledHandler = function(){
        script.vmlModule.stopListening();
    };

    var onListeningErrorHandler = function(eventErrorArgs){
        print("VoiceML error: " + eventErrorArgs.error + " desc: "+ eventErrorArgs.description);
    };

    var onUpdateListeningEventHandler = function(eventArgs) {
        callback(eventArgs);
    };

    script.vmlModule.onListeningUpdate.add(onUpdateListeningEventHandler);
    script.vmlModule.onListeningError.add(onListeningErrorHandler);
    script.vmlModule.onListeningEnabled.add(onListeningEnabledHandler);
    script.vmlModule.onListeningDisabled.add(onListeningDisabledHandler);

    options.speechRecognizer = VoiceMLModule.SpeechRecognizer.Default;
    options.shouldReturnAsrTranscription = true;

    var sanitizedBoosts = [];
    for(var i = 0; i < script.boosts.length; i++){
        var thisBoost = script.boosts[i];
        if(thisBoost.length === 0) continue;
        sanitizedBoosts.push(thisBoost.toLowerCase());
    }
    if(sanitizedBoosts.length != 0) options.addSpeechContext(sanitizedBoosts, script.boostsAmount);
}