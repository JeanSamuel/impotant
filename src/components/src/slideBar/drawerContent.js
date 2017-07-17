import React, {Component} from 'react'
import {View,Text,ScrollView} from 'react-native';


export default class DrawerContent extends Component {

  render(){
    return(
        <View style={{elevation: 10}}>
                <View style={{height:150,backgroundColor:'#16a085'}}>
                    <View style={{marginTop:20, alignItems:'center'}}>
                        <Text style={{fontSize:30,color:'#fff'}}>
                            Marchand Vola
                        </Text>
                        <Text style={{fontSize:50,color:'#fff'}}>
                            MGA 25 000
                        </Text>
                    </View>
                </View>
        </View>
    )
  }
}
