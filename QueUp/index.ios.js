'use strict';

var React = require('react-native');
global.SERVER_PATH = "http://queup.io";
var LoginView = require('./views/Login.js');
var HomeView = require('./views/Home.js');

var Router = require('react-native-router');


var {
  StyleSheet,
  Text,
  Navigator,
  AppRegistry,
  AsyncStorage
} = React;



var firstRoute = {
  name: 'QueUp',
  component: LoginView
};

var QueUp = React.createClass({

componentWillUpdate: function(){

},


renderScene: function(route, nav) {
    var currentUser;
    if(route.currentUser){
      return <HomeView currentUser={route.currentUser}/>;
    }else{
        switch (route.id) {
          case 'login':
            return <LoginView navigator={nav}/>;
          default:
            return (
              <LoginView navigator={nav}/>
            );
        }
    }

},

 render: function() {

  return (
      <Navigator
      style={{backgroundColor: '#ffffff'}}
      initialRoute={{ id: "login" }}
      renderScene={this.renderScene}
      configureScene={(route) => {
          if (route.sceneConfig) {
              return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight
        }
      }/>
    )
  }

});

AppRegistry.registerComponent('QueUp', () => QueUp);
