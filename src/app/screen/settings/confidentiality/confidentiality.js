// import liraries
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RowValue, RowTitle} from '../../../components/row'

class Confidentiality extends Component {
  goBack () {
    this.props.navigation.navigate('Settings')
  }
  render () {
    return (
      <View style={styles.container}>
        <RowTitle
          title='Conditions et confidentialités'
          help={"Conditions d'utilisation et politiques de confidentialité"}
        />
        <RowValue
          menu='Droit et résponsabilité'
          value="Condition que vous acceptez en utilisant l'application"
          action={() => console.log('zertyu')}
          noNext
        />
        <RowValue
          menu="Politique d'utilisation des données"
          value='Les informations que nous recevons et les utilisations'
          action={() => console.log('zertyu')}
          noNext
        />
        <RowValue
          menu='La loi malgache'
          value='Les responsabilités de chacun vis à vis de la loi malgache'
          action={() => console.log('zertyu')}
          noNext
        />
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {paddingHorizontal: 5}
})

// make this component available to the app
export default Confidentiality
