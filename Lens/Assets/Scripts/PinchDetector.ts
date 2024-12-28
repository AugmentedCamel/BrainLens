import { SIK } from 'Resources/SpectaclesInteractionKit/SIK';

@component
export class ExampleHandScript extends BaseScriptComponent {
  onAwake() {
    this.createEvent('OnStartEvent').bind(() => {
      this.onStart();
    });
  }

  onStart() {
    // Retrieve HandInputData from SIK's definitions.
    let handInputData = SIK.HandInputData;

    // Fetch the TrackedHand for left and right hands.
    let leftHand = handInputData.getHand('left');
    let rightHand = handInputData.getHand('right');

    // Add print callbacks for whenever these hands pinch.
    leftHand.onPinchDown.add(() => {
      print(
        `The left hand has pinched. The tip of the left index finger is: ${leftHand.indexTip.position}.`
      );
    });
    rightHand.onPinchDown.add(() => {
      print(
        `The right hand has pinched. The tip of the right index finger is: ${rightHand.indexTip.position}.`
      );
    });
    leftHand.onPinchUp.add(() => {
      print(`The left hand has unpinched.`);
    })
    rightHand.onPinchUp.add(() => {
      print(`The right hand has unpinched.`)
    })
  }
}