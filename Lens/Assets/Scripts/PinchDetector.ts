import { SIK } from 'Resources/SpectaclesInteractionKit/SIK';

@component
export class ExampleHandScript extends BaseScriptComponent {
  
  @input objectPrefab:ObjectPrefab;
  //@input handFollower:SceneObject;
  
  bubbleStartPoint: vec3;
  latestBubble: SceneObject;

  private handInputData = SIK.HandInputData;
  private rightHand = this.handInputData.getHand('right');
  isPinching: boolean;
  
 
  
  onAwake() {
    this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this))
    this.rightHand.onPinchDown.add(this.onTriggerDown.bind(this))
    this.rightHand.onPinchUp.add(this.onTriggerUp.bind(this))
    
    this.createEvent("TapEvent").bind(() => {
      // let body = this.debugBall.getComponent("Physics.BodyComponent")
      // body.addForce(new vec3(0, 1, 0), Physics.ForceMode.Impulse)
      this.onTriggerDown()
      this.onTriggerUp()
    })
  }
  
  onUpdate() {
    if (this.isPinching) {
      
      this.latestBubble.getTransform().setWorldPosition(this.rightHand.thumbPad.position);
      // this should be done with smoothfollower
    }
  }
  
  onTriggerDown() {
    this.isPinching = true;
    print(`DOWN`);
    this.bubbleStartPoint = this.rightHand.thumbPad.position;
    this.latestBubble = this.objectPrefab.instantiate(this.sceneObject);
    this.latestBubble.getTransform().setWorldPosition(this.bubbleStartPoint)
    
    // do physic things
  }
  
  onTriggerUp() {
    this.isPinching = false;
    print(`RELEASED`);
    this.latestBubble = null;
    //should set new target for smooth follower bubble that is on the same location and or the bubbl follows a bubbletarget
  }
}