// @input Component.Text brainText
// @input Component.ScriptComponent speechScript

isBeingLaunched:boolean = true;
var isPinching = false;



// Function to update the text dynamically
function updateText() {
    
    
    
    if (!script.isBeingLaunched) {
        // Update the brainText content
        script.brainText.text = script.speechScript.api.getFinalTranscription();
         
    }
}

function afterRelease(){
    script.isBeingLaunched = false;
    print("after release");
}


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(updateText);

