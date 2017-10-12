//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import MyQrCode from "../../components/qrCode";
import { NotificationServices, SyncServices, Services } from '../../services';
import { Notifications } from "expo";
import DeviceInfo from 'react-native-device-info'

// create a component
class AppSync extends Component {

    constructor(props){
        super(props);
        this.state = {
            textStatus : 'Préparation',
            textStatus2 : 'pour la synchronisation',
            textHelp : '',
            value : '',
            isSetted : false,
            isSynchronised : false,

            notification: {}
        }
    }

    componentWillMount() {
        this._notificationSubscription = Notifications.addListener(
          this._handleNotification
        );
    }

    componentWillUnmount() {
    this.dismissAlert();
    this._notificationSubscription.remove();
    }

    _handleNotification = notification => {
        this.setState({ notification: notification });
        try {
            let userData = this.synchronisation(notification);
            this.saveData(userData)
            .then(() =>{
                this.props.navigation.navigate('drawer')
            }).catch(error =>{
                console.log('====================================')
                console.log('error saving userdata')
                console.log('====================================')
                throw error
            })
            
        } catch (error) {
            throw error
        }
        
           
    };

    synchronisation(notification){
        let syncServices = new SyncServices();
        let isDataOk = syncServices.checkData(notification);
        let userData = null;
        if(isDataOk){
            this.setState({
                isSynchronised : true,
                textStatus : 'Début de synchronisation...',
                textStatus2 : 'compte : ' + notification.data.alias,
                textHelp : ''
            })
            try {
                userData = syncServices.getUserData(notification.data);
                return userData;
            } catch (error) {
                
                console.log('====================================')
                console.log('connexion error')
                console.log('====================================')
                throw error;
            }
        }
        
    }

    async saveData(userData){
        this.setState({
            isSynchronised : true,
            textStatus : 'Configuration du compte',
            textStatus2 : '',
            textHelp : ''
        })
        let services = new Services();
        try {
            await services.saveData('userData', JSON.stringify(userData))
        } catch (error) {
            throw error
        }
        
    }
    
    async componentDidMount() {
        if(!this.state.isSetted){
            var token = await new NotificationServices().getExpoToken();
            this.setState({
                isSetted : true,
                value : token,
                textStatus : 'Prêt',
                textStatus2 : '',
                textHelp : "Prenez en photo avec l'application AriaryClient"
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.titleContainer} >
                    <Text style={styles.title1} >{this.state.textStatus}</Text>
                    <Text  style={styles.title2} >{this.state.textStatus2}</Text>
                </View>
                
                <View  style={styles.body} >
                {
                    this.state.isSetted && !this.state.isSynchronised
                    ?   <MyQrCode value={this.state.value}/>
                    :   null
                }
                    
                    <Text style={styles.textHelp} >{this.state.textHelp}</Text>
                </View>
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
        backgroundColor: 'white',
    },
    titleContainer : {
        marginBottom : 20
    },
    title1 : {
        textAlign : 'center',
        fontSize : 28,
        fontWeight : '100'
    },
    title2 :{
        textAlign : 'center'
    },
    textHelp : {
        marginTop : 15
    }
});

//make this component available to the app
export default AppSync;
