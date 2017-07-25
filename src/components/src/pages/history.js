//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ListView } from 'react-native';
import { Icon } from 'react-native-elements';
import {StackNavigator} from 'react-navigation'
import styles from '../../styles/MainStyles';
import Details from './details';
import Row from './row';
import DrawerButton from '../slideBar/drawerButton';
import axios from 'axios';

// create a component
class History extends Component {

    static navigationOptions = {
        title : 'History',
        drawerIcon : ({tintColor}) => <Icon name="list" size= {25} />,
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
    }

    constructor(props){
        super(props)
        this.state = {
            token : 'Azertyukjhgfd245SD3HBVS35FZF52EZ224SFGBVCHNBVC',
            accountId : 1,
            accountName : 'Toavina',
            data : null
        }
        this.getHistory()
    }

    getHistory(){
        console.log('les valeurs après retour ', this.props)
        if(false){

        }else{
            var url = 'http://ariary.vola.mg/transaction/'+ this.state.accountId
            axios.get(
                url
            ).then((response) =>{
                this.setState({data : response.data})
            }).catch((error) =>{
                console.log(error)
            })
        }
            
    }

    render() {
        if(this.state.data === null){
            return (
                <View
                    style = {{
                        flex : 1,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}
                >
                    <ActivityIndicator size="large"  />  
                </View>
            );
             
        }else{
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            
            return (
                <View>
                    <View style={styles.headerList}>
                        <Text style={styles.greyText}>Nom | date</Text>
                        <Text  style={styles.greyText}>Amount</Text>
                    </View>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.data)}
                        renderRow={(row, j, k) => <Row info={row} index={parseInt(k)} navigation={this.props.navigation}  />}
                    />
                </View>
            );
        }
    }

    navigation(){
        this.props.navigation.navigate('DrawerOpen')
    }
}


const navigationOptions = {
    headerStyle : styles.header,
    headerTitleStyle : styles.headerTitle
}

const stackHistory = new StackNavigator({
    History : {
        screen : History,
        navigationOptions
    },
    Details : {
        screen : Details,
        navigationOptions
    }
},{
    
    navigationOptions : ({navigation}) => ({
        headerLeft : <DrawerButton navigation={navigation} />
    })
    
})



//make this component available to the app
export default stackHistory;
