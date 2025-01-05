import { SIK } from 'Resources/SpectaclesInteractionKit/SIK';


@component
export class NewScript extends BaseScriptComponent {
    
    @input
    bubbleText: Text;
    
    isPinched: boolean = false;
    
    onAwake() {
        this.createEvent('OnStartEvent').bind(() => {
            this.onStart();
            this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this))
        });
    }
    
    onUpdate() {
        if (!this.isPinched){
            //update text
            //script.api.SetText(this.bubbleText, "Hello World");
            
            
        }
    }

    onStart() {
        print('New Bubble Started')    
    }
}
