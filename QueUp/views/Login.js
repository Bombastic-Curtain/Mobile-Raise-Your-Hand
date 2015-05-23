'use strict';
var React = require('react-native');
var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  AsyncStorage
} = React;

  var FacebookLoginManager = require('NativeModules').FacebookLoginManager;


var LoginView = module.exports = React.createClass({


  getInitialState: function () {
    return {
      fbToken: '',
    };
  },


  componentDidMount: function() {
    AsyncStorage.getItem("QueUptoken")
      .then((token)=>{
        if(token !== null) {
          console.log("----- Token is : " + token);
          //id the user is already log in do nothing and send them to the next page.
          //self.props.mixins.navTo("ClassList");
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
        self.setState({
          fbToken: info.token
        }, function(){
          console.log("------- token set , and save it with AsyncStorage---------");
          self.saveToken(self.state.fbToken);
          // use logged in switching to classList
          self.props.mixins.navTo("ClassList");
        });
      }
    });
  },


  saveToken: function(token){
    console.log("---- > saving fb token to AsyncStorage " + token);
    return new Promise(function(resolve, reject) {
      AsyncStorage.setItem('QueUptoken', token, (error) => {
          if (error) {
            console.log('----- saving token failed : ( -------' + error.message);
          } else {
            resolve();
          }
      });
    });
  },

  // handlePress: function () {
  //   this.props.mixins.navTo("ClassList");
  // },

render: function () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.login}>
          <Text style={styles.TouchableOpacity}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  TouchableOpacity: {
    top: 100,
    color: "#f56000"
  }
});