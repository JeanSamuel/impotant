import React, {PureComponent} from 'react'
import {View,Text} from 'react-native';
import { DrawerItems  } from 'react-navigation';


export default class DrawerContent extends PureComponent  {
  constructor(props) {
    super(props)
  }
  render(){
    return(
        <View>
            <View>
                <DrawerItems {...this.props} />
            </View>
        </View>
    )
  }
}
