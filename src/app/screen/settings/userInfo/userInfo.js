// import liraries
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {RowValue, Separator, RowTitle} from '../../../components/row'
import {styleBase} from '../../../assets/styles'
import Services from '../../../services/utils/services'

// create a component
const self = null
class UserInfo extends Component {
  constructor (props) {
    super(props)
    self = this
    this.state = {
      pseudo: '...',
      nom: '...',
      email: '...',
      phone: '...'
    }
  }

  goBack () {
    this.props.navigation.navigate('Settings')
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    let services = new Services()
    services
      .getData('userInfo')
      .then(response => {
        if (response != null) {
          dataParsed = JSON.parse(response)
          this.setState({
            pseudo: dataParsed.pseudo,
            nom: dataParsed.pseudo,
            email: dataParsed.pseudo,
            phone: dataParsed.pseudo
          })
        }
      })
      .catch(error => {
        // console.log("error", error);
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <RowTitle title="Profil d'utilisateur" />
        <RowValue
          menu='Pseudo'
          value={this.state.pseudo}
          action={() => console.log('zertyu')}
          noNext
        />
        <Separator />
        <RowValue
          menu='Nom et Prénoms'
          value={this.state.nom}
          action={() => console.log('zertyu')}
        />
        <Separator />
        <RowValue
          menu='Adresse e-mail'
          value={this.state.email}
          action={() => console.log('zertyu')}
        />
        <Separator />
        <RowValue
          menu='Téléphone'
          value={this.state.phone}
          action={() => console.log('zertyu')}
        />
        <Separator />
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {paddingHorizontal: 5}
})

// make this component available to the app
export default UserInfo
