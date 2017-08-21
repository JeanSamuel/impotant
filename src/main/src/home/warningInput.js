//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon} from 'react-native-elements';
import styles from '../../styles/HomeStyles';

// create a component
class WarningInput extends Component {
    render() {
        return (
            <View >
                <View style={styles.invalidInput}>
                    <Icon name="warning" size= {15} color={'red'}/>
                    <Text style={styles.invalidInputText}>Montant invalide</Text>
                </View>
            </View>
        );
    }
}


//make this component available to the app
export default WarningInput;
