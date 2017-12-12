/**
 * Jean Samuel RANDRIANASOLO
 */
import { StackNavigator } from "react-navigation";
import { Main, Bienvenue, Validation } from "../../../screen/indexScreen";
const StartStack = new StackNavigator(
  {
    Main: { screen: Main },
    Bienvenue: { screen: Bienvenue },
    ValidationInscription: { screen: Validation }
  },
  {
    headerMode: "none"
  }
);

export default StartStack;
