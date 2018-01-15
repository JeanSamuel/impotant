import MultiStep from "react-native-multistep-wizard";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

/* Define the steps of multistep wizard */

const steps = [
  { name: "StepOne", component: <StepOne /> },
  { name: "StepTwo", component: <StepTwo /> },
  { name: "StepThree", component: <StepThree /> }
];

/* Define your class */
class Register extends Component {
  /* define the method to be called when the wizard is finished */

  finish(wizardState) {
    //code to be executed when wizard is finished
  }

  /* render MultiStep */
  render() {
    return (
      <View style={styles.container}>
        <MultiStep steps={steps} onFinish={this.finish} />
      </View>
    );
  }
}
