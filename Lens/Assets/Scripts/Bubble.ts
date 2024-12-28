import { SIK } from 'Resources/SpectaclesInteractionKit/SIK';


@component
export class NewScript extends BaseScriptComponent {
    
    
    
    onAwake() {
        this.createEvent('OnStartEvent').bind(() => {
            this.onStart();
        });
    }
    
    onStart() {
        print('New Bubble Started')    
    }
}
