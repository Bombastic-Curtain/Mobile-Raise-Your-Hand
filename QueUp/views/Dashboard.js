
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
  Animation,
  Component
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

var Utils = require('../utils/utils.js');
var HeaderLogo = require('../Components/HeaderLogo.js');

//--------- Brige to native UIViewController , for webRTC (test) ------------
var NativeViewBridge = require('NativeModules').NativeViewBridge;
console.log('-------- native module mthods ------');
console.log(NativeViewBridge);

//---------------------------------------------------------------------------
var RNChart = require('react-native-chart');

//------------- CHART -------------------------------------

var ContributionCount = require('../Components/ContributionCount.js');

//var NumberEasing = require('react-number-easing');

// ------------------- Dummy data for chart ----------------
var chartData = [
    {
        name:'BarChart',
        color:'white',
        widthPercent:0.6,
        lineWidth:3,
        data:[
            30, 21, 5, 34, 20, 55, 30
        ]
    }
];
var xLabels = ['','','','','']; // ['0','1','2','3','4'];
// ------------------- End of dummy data --- ----------------


var NativeViewBridge = require('NativeModules').NativeViewBridge;

//----------------------
module.exports = React.createClass({

  getInitialState: function () {
    return {
      currentUserName: this.props.data.currentUser.currentUserName,
      currentUserEmail: this.props.data.currentUser.currentUserEmail,
      currentUserPicture: this.props.data.currentUser.currentUserPicture.data.url,
      tempNumber: 120,
    }
  },

  componentDidMount: function() {
    global.router = this.props.toRoute;
    // animation for the dashboard , does not work right now , will fix 
    // AnimationExperimental.startAnimation({
    //   node: this.refs.dashBoardIcon,
    //   duration: 600,
    //   easing: 'linear',
    //   property: 'opacity',
    //   toValue: 1,
    // });

  },
  render: function() {

    Utils.updateStats();

    //------------- this binrgs up a Native UIViewContoller -----------
    /*
        <TouchableHighlight onPress={() => NativeViewBridge.goToNative()}>
            <Text> GO TO NATIVE </Text>
        </TouchableHighlight>
    */
    return (
      <View style={styles.container}>
        <ContributionCount currentUser = {this.state} />
        <View style={styles.dashBottom} >

   

        <RNChart style={styles.chart}
                    chartData={chartData}
                    verticalGridStep="5"
                    animationDuration= "3"
                    xLabels={xLabels}
                    showGrid = {false}
                    showAxis = {false}
                    labelFontSize = '1'
                    labelTextColor = '#18CFAA'
                    >

        </RNChart>


      </View>
        <Stats />        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EC749'
  },
  header: {
    height: 67,
    backgroundColor: '#6EC749'
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
  },
  chart: {
    position: 'absolute', top: 16, bottom: 4,right: 6,
    height: DeviceHeight/3,
    width: DeviceWidth * 1.1
  }

});
