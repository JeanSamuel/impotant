import React from 'react'

import {View, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

class HeaderButton extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity
          onPress={this.props.action}
        >
          <Icon name={this.props.iconName} color={this.props.color} size={30} type={this.props.type} />
        </TouchableOpacity>
      </View>
    )
  }
}

export  default HeaderButton