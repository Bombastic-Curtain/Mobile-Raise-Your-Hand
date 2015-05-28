
'use strict';

var React = require('react-native');
var {
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  Animation
} = React;

var Router = require('react-native-router');
var DeviceWidth = require('Dimensions').get('window').width;
var DeviceHeight = require('Dimensions').get('window').height;

var MainSideMenu = require('react-native-side-menu');
var SideMenuView = require('../Components/SideMenu.js');
var SideMenuIconComponent = require('../Components/SideMenuButton.js');

// var LargeNumberBlock = require('../Components/LargeNumberBlock.js');
var AnimationExperimental = require('AnimationExperimental');
var Stats = require('../Components/Stats.js');

var UserBadge = require('../Components/UserBadge.js')
var Utils = require('../utils/utils.js');
var HeaderLogo = require('../Components/HeaderLogo.js')

module.exports = React.createClass({


  getInitialState: function () {
    return {
      currentUserName: this.props.data.currentUser.currentUserName,
      currentUserEmail: this.props.data.currentUser.currentUserEmail,
      currentUserPicture: this.props.data.currentUser.currentUserPicture.data.url
    }
  },

  componentDidMount: function() {
    global.router = this.props.toRoute;
    // animation for the dashboard , does not work right now , will fix 
    AnimationExperimental.startAnimation({
      node: this.refs.dashBoardIcon,
      duration: 600,
      easing: 'linear',
      property: 'opacity',
      toValue: 1,
    });
  },

  render: function() {
    Utils.updateStats();
    return (
      <View style={styles.container}>
        <UserBadge currentUser = {this.state} />
        <Stats />        
        <View style={styles.dashBottom} >
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18CFAA'
  },
  header: {
    height: 67,
    backgroundColor: '#18CFAA'
  },
  //------ edit -------
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    borderTopColor: 'white',
    borderTopWidth: .5
  },
  dashBottom: {
    height: DeviceHeight/2,
    width: DeviceWidth
  }

});
