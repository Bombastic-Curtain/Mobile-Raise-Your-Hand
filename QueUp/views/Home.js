
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
  AsyncStorage
} = React;



var Router = require('react-native-router');
var DeviceWidth = require('Dimensions').get('window').width;
var DeviceHeight = require('Dimensions').get('window').height;
var MainSideMenu = require('react-native-side-menu');
var SideMenuView = require('../Components/SideMenu.js');
var SideMenuIconComponent = require('../Components/SideMenuButton.js');


var DashboardView = require('./Dashboard.js');

var HeaderLogo = require('../Components/HeaderLogo.js')



module.exports = React.createClass({

  getInitialState: function () {
    var currentUser = JSON.parse(this.props.currentUser);
    return {
      currentUserName: currentUser.name,
      currentUserEmail: currentUser.email,
      currentUserPicture: currentUser.picture,
      
    };
    
  },

  componentDidMount: function() {
    global.mainSideMenu = this.refs["mainSideMenu"];
  },

  firstRoute: {
    name: 'Dashboard',
    data: {},
    component: DashboardView,
    leftCorner: SideMenuIconComponent
  },

  render: function() {
    return (
    <MainSideMenu menu={<SideMenuView />} ref="mainSideMenu">

          <Router ref="router"
            firstRoute = { 
                  {
                  name: 'Dashboard',
                  data: {currentUser: this.state},
                  component: DashboardView,
                  leftCorner: SideMenuIconComponent,
                  titleComponent: HeaderLogo
                  }
            }
            headerStyle={styles.header}
          />
    </MainSideMenu>

    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    height: 60,
    backgroundColor: '#18CFAA'
  }
});
