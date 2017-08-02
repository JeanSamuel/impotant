import { StyleSheet,Dimensions } from 'react-native';  

const { width, height } = Dimensions.get("window");

export default {
    header : {
        backgroundColor : 'rgba(52, 152, 219,1.0)',
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
    buttonContainer :{
        justifyContent : 'center',
        alignItems: 'center',
    },
    loginButton : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems: 'center',
        width : 250,
        height : 60,
        marginBottom : 5,
        backgroundColor : 'rgba(22, 160, 133,1.0)' 
    },
    signinButton : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems: 'center',
        width : 200,
        height : 30,
        marginBottom : 10,
        backgroundColor : 'rgba(41, 128, 185,1.0)' 
    },
    loginButtonText : {
        color : 'rgba(236, 240, 241,1.0)',
        fontSize : 15
    },
    signinButtonText : {
        color : 'rgba(236, 240, 241,1.0)',
        fontSize : 20
    },
    closeText : {
        color : 'rgba(236, 240, 241,1.0)',
        fontSize : 20,
        textAlign : 'right'
    },
    closeTextObject : {
        flexDirection : 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop : 20,
    },
    closeTextContainer : {
        height : 30,
        
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'rgba(52, 73, 94,0.5)'
    },
    webViewContainer : {
        flex : 1,
        width : width  - 50,
        height : height -  height/10, 
        marginVertical : 50,
        padding : 5,
        backgroundColor : 'rgba(236, 240, 241,1.0)'
    },
    










}