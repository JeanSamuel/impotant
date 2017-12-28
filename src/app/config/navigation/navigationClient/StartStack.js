/**
 * Jean Samuel RANDRIANASOLO
 */
import { StackNavigator } from "react-navigation";
import { Main, Bienvenue, Validation } from "../../../screen/index";
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
