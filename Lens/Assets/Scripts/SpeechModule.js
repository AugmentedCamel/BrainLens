//@input Asset.VoiceMLModule vmlModule {"Label": "Voice ML Module"}

var options = VoiceML.ListeningOptions.create();

var onListeningEnabledHandler = function () { //when the mic is enabled
    script.vmlModule.startListening(options);
    print("start listening");
};

var onListeningDisabledHandler = function () {
    script.vmlModule.stopListening();
    print("stop listening");
};

var onListeningErrorHandler = function (eventErrorArgs) {
    print(
        'Error: ' + eventErrorArgs.error + ' desc: ' + eventErrorArgs.description
    );
};

var onUpdateListeningEventHandler = function(eventArgs) {
...
};

//VoiceML Callbacks
script.vmlModule.onListeningUpdate.add(onUpdateListeningEventHandler);
script.vmlModule.onListeningError.add(onListeningErrorHandler);
script.vmlModule.onListeningEnabled.add(onListeningEnabledHandler);
script.vmlModule.onListeningDisabled.add(onListeningDisabledHandler);