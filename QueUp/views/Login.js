'use strict';
var React = require('react-native');
var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TouchableHighlight
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var SideMenuIconComponent = require('../Components/SideMenuButton.js');

var HomwView = require('./Home.js');


var Video = require('react-native-video');




var LoginView = module.exports = React.createClass({

  getInitialState: function () {
    return {
      fbToken: '',
      fbID: ''
    };
  },

  componentDidMount: function() {
    AsyncStorage.getItem("QueUpCurrentUser")
      .then((userObj)=>{
        if(userObj !== null) {
            // send user to home with a currentUser prop 
            this.props.navigator.replace({ id: 'home',  
                                             currentUser: userObj 
                                           });
                                          }
      });
  },

  login: function() {
    var self = this;
    console.log("------------------- facebook login pressed ------------------");
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({fbToken: error});
      } else {
        console.log('----------------- initial response from facebook ----------');
        console.log(info);
        self.setState({
          fbToken: info.token,
          fbID: info.userId
        }, function(){
          AsyncStorage.setItem("FBToken", self.state.fbToken, () => {});
          console.log("------- token set , and save it with AsyncStorage---------");
                    console.log("------- token set , and save it with AsyncStorage---------");

          console.log("fb token " + this.state.fbToken);
          self.saveUserToSession(this.state.fbID, this.state.fbToken).then(function(userObj){
          self.props.navigator.replace({ id: 'home',  
                                             currentUser: userObj 
                                           });
          });
          
        });
      }
    });
  },

  fetchUserDataFromFB: function(fbId, fbToken){
    //http://graph.facebook.com/[FBID]/picture?type=large
    console.log('-------- facebook fetch called --------');
      return new Promise(function(resolve, reject) {
        var url = `https://graph.facebook.com/v2.3/${fbId}?access_token=${fbToken}` +
              '&fields=name,email,picture&format=json';
        fetch(url).then((response)  => response.json()).then((JSONres) => {
          console.log("------ RECIEVED RESPONSE FROM FACEBOOK ------------");
          console.log(JSONres);
          resolve(JSONres);
          });
      });
  },

  saveUserToSession: function(fbId, fbToken){
    var self = this;
    console.log('----- going to ask fb for user -----');
    return new Promise(function(resolve, reject) {
      console.log('----- going to ask fb for user -----');
        self.fetchUserDataFromFB(fbId, fbToken).then(function(JSONres){
            var userObj = JSON.stringify(JSONres);
            AsyncStorage.setItem('QueUpCurrentUser', userObj, (error) => {
                if (error) {
                  console.log('----- saving token failed : ( -------' + error.message);
                } else {
                  resolve(userObj);
                }
            });

        });
    }); 
  },


render: function () {

    return(

       <View style={styles.mainContainer}>



         <Image
              style={styles.logo}
              source={require('image!logoQueUp')}/>  

        <TouchableHighlight
          style={styles.button}
          onPress={this.login}          
          underlayColor="white">
          <Text style={styles.buttonText}> SIGN IN WITH FACEBOOK </Text>
        </TouchableHighlight>

               
      </View>
      );
  }

});


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },



  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },


  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 100,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 220,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logo: { 
    marginLeft: 35,

    height: 80,
    width: 240, 
    marginRight: 10 
  },

});




