import { StyleSheet,Dimensions } from 'react-native';  

const { width, height } = Dimensions.get("window");

export default {
    header : {
        backgroundColor : 'rgba(41, 128, 185,1.0)',
        justifyContent: 'center',
        paddingHorizontal : 15
    },
    row : {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow : 1,

    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        
    },
    headerTitle : {
        color : "#ecf0f1",
        fontSize : 25
    },
    qrText : {
        textAlign : 'center',
        fontSize : 15,
        margin : 15,
        width : 300

    },
    input : {

    },
    amount : {
        fontSize : 30,
        textAlign : 'center',
        width : 200

    },
    amountContainer : {
        justifyContent : 'center',
        alignItems: 'center',
        marginHorizontal : 20,
    },
    amountLabel : {
        fontSize : 25,
        textAlign : 'center',
        color : 'rgba(142, 68, 173,1.0)'
    },
    
    
    










}