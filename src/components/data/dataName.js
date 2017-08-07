import { StyleSheet } from 'react-native';  

export default {
  type : [
    'Chez','Hotel','Epicerie','Hotely','Boucherie','Tranombarotra','Grossiste','Distributeur',
    'Le Café','Coiffure'
  ],
  name : [
    'Aina', 'Ainga', 'Aintsoa', 'Ando', 'Andry', 'Andy', 'Anja','Antsa', 'Antso', 'Avo', 
    'Bako', 'Bakoly', 'Baliaka', 'Baovola', 'Benja', 'Boto', 
    'Dadavy', 'Dama', 'Dimby', 'Dina', 'Elintsoa', 'Faly', 'Fanja', 'Fidy', 
    'Haingo', 'Hanta', 'Harena', 'Hasina', 'Harizo', 'Henintsoa', 'Ialy' , 'Iony', 
    'Joda', 'Kiady', 'Mamilaza', 'Tovo', 'Toky', 'Mandresy', 'Miora', 'Mamy', 'Mbola'
  ],  
  client_id : 'ariarynet',
  redirect_uri : 'http://auth.vola.mg/index.php/',
  scope : 'userinfo',
  grant_type: 'authorization_code',
  uri : 'auth.vola.mg/oauth2/authorize?response_type=code&state=xyz&client_id=ariarynet&redirect_uri=http://auth.vola.mg/index.php/&scope=userinfo'
  
}