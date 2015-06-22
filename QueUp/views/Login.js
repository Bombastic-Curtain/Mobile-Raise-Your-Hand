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

var Utils = require('../utils/utils.js');

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var SideMenuIconComponent = require('../Components/SideMenuButton.js');

var HomwView = require('./Home.js');

var NativeViewBridge = require('NativeModules').NativeViewBridge;



var LoginView = module.exports = React.createClass({

  getInitialState: function () {
    return {
      fbToken: '',
      fbID: ''
    };
  },

  componentDidMount: function() {

    Utils.getAsyncStats()
      .then((item) => {
        if(item === null) {
          var freshStats = {
            classes: 0,
            handsRaised: 0,
            calledsOn: 0
          };
          Utils.setAsyncStats(JSON.stringify(freshStats));
        }
      });

    AsyncStorage.getItem("QueUpCurrentUser")
      .then((userObj)=>{
        if(userObj !== null) {
            // send user to home with a currentUser prop 
          this.props.navigator.replace({ 
            id: 'home',  
            currentUser: userObj 
          });
        }
      });
  },

  login: function() {
    var self = this;
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({fbToken: error});
      } else {
        self.setState({
          fbToken: info.token,
          fbID: info.userId
        }, function(){
          AsyncStorage.setItem("FBToken", self.state.fbToken, () => {});
          self.saveUserToSession(this.state.fbID, this.state.fbToken)
            .then(function(userObj){
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
      return new Promise(function(resolve, reject) {
        var url = `https://graph.facebook.com/v2.3/${fbId}?access_token=${fbToken}` +
              '&fields=name,email,picture&format=json';
        fetch(url).then((response)  => response.json()).then((JSONres) => {
          resolve(JSONres);
          });
      });
  },

  saveUserToSession: function(fbId, fbToken){
    var self = this;
    return new Promise(function(resolve, reject) {
        self.fetchUserDataFromFB(fbId, fbToken).then(function(JSONres){
            var userObj = JSON.stringify(JSONres);
            // //--------------------- TAKE THE EMAIL ADDRESS AND SEND IT OVER TO OBJECT C   -------------------
            // NativeViewBridge.addEmail(JSONres.email.toString());
            // //------------------------------------------------
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
              source={require('image!QueUpLogo')}/>  

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
    marginLeft: 25,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  logo: { 
    marginLeft: 35,
    height: 80,
    width: 270, 
    marginRight: 10 
  },

});




