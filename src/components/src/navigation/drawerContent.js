import React, {Component} from 'react'
import {View,Text,ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import Services from '../services/services';


export default class DrawerContent extends Component {

    constructor(props){
        super(props)
        this.state = {
            solde : '',
            report : 'null',
            ownerId : 3,
            ownerName : 'Toavina Ralambosoa'
        }
        this.checkSolde()
    }

    getReport(){
        return this.state.report
    }

    async checkSolde() {
        var user_id = await new Services().getData('user_id')
        this.setState({
            ownerId : user_id,
            ownerName : user_id
        })
        console.log(this.state)
        var url = 'http://ariary.vola.mg/balance/'+ this.state.ownerId
        axios.get(
            url
        ).then((response) =>{
            this.setState({report : response.data.value})

        }).catch((error) =>{
            console.log(error)
        })
    }
    
    render(){
        let logoFromFile = require('../../images/icons/user.png');
        let reportFormated = Services.formatNumber(this.getReport())
        return (
            <View style={{elevation: 10}}>
                    <View style={{height:150,backgroundColor:'rgba(41, 128, 185,1.0)', padding : 20}}>
                        <View >
                            <View style={{marginTop:20, flexDirection:'row', justifyContent : 'space-between'}}>
                                <View>
                                    <Icon name="user-circle" color="#ecf0f1" size= {60} type='font-awesome' />
                                </View>
                                <View>
                                    <Text style={{fontSize:25,color:'#fff',textAlign:'right'}}>
                                        Marchand Vola
                                    </Text> 
                                    <View>
                                        <Text
                                            style={{fontSize:35,color:'#fff',textAlign:'right'}}
                                        >{reportFormated} Ar</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={{fontSize:20,color:'#fff', textAlign:'right'}}>( {this.state.ownerName} )</Text>
                    </View>
            </View>     
        )
  }
}
