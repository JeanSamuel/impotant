//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';

// create a component
class Details extends Component {

    static navigationOptions = {
        title : 'History',
        drawerIcon : ({tintColor}) => <Icon name="list" size= {25} />,
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
    }

    static propTypes = {
        user  : React.PropTypes.object
    }

    goBackList(){
        this.props.navigation.navigate('History')
    }

    render() {
        const { user } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text>{user.amount} {user.currency}</Text>
                <Text>{user.date}</Text>
                <Button
                    title = "Revenir à la liste"
                    onPress = {() => this.goBackList()}
                 />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

//make this component available to the app
export default Details;
