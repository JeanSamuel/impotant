//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ListView, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import {StackNavigator} from 'react-navigation'
import styles from '../../styles/MainStyles';
import Details from './details';
import Row from './row';
import DrawerButton from '../slideBar/drawerButton';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr')

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
            data : null,
            refreshing : false
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
                this.setState({data : this.refactHistory(response.data)})
                
            }).catch((error) =>{
                console.log(error)
            })
        }   
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getHistory()
        this.setState({refreshing: false});
    }

    refactHistory(data){
        var actualDate = data[0].date.split(' ')[0]
        var dataRefactored = [[data[0]]]
        var actualLigne = 0

        for (var index = 1; index < data.length; index++) {
            var transac = data[index]
            var date = transac.date.split(' ')[0]
            if(date == actualDate){
                dataRefactored[actualLigne].push(transac)
            }else{
                actualDate = date
                actualLigne++
                dataRefactored[actualLigne] = []
                dataRefactored[actualLigne][0] = transac
            } 
        }
        return dataRefactored
    }

    renderSectionHeader(sectionData, sectionID) {
        let actualDate = sectionData[0].date.split(' ')[0]
        var section = moment(actualDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
        var test = moment('2017-07-03', 'YYYY-MM-DD').format('YYYY-MM-DD')
        var today = "Aujourd'hui"
        if(moment(test).isSame(section, 'd')){
            section = (
                <View style={styles.sectionHeaderNow} >
                    <Text style={[styles.sectionHeaderTitle, styles.sectionHeaderTitleNow]} >{today}</Text>
                </View>
            )
        }else{
            section = (
                <View style={styles.sectionHeader} >
                    <Text style={styles.sectionHeaderTitle} >{moment(section).format('dddd Do MMMM YYYY')}</Text>
                </View>
            )
        }
        return (
            <View>{section}</View>
        )
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
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            });
            
            return (
                <View>
                    <View style={styles.headerList}>
                        <Text style={styles.greyText}>Nom | Type</Text>
                        <Text  style={styles.greyText}>Amount</Text>
                    </View>
                    <ListView
                        refreshControl = {
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        dataSource={ds.cloneWithRowsAndSections(this.state.data)}
                        renderSectionHeader = {this.renderSectionHeader}
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
