'use strict';
var React = require('react-native');
var Stats = require('../Components/Stats.js');
var SocketIO = require('react-native-swift-socketio');

// var LargeNumberBlock = require('../Components/LargeNumberBlock.js');
var Utils = require('../utils/utils.js')

var DeviceWidth = require('Dimensions').get('window').width;
var DeviceHeight = require('Dimensions').get('window').height;

var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
    DeviceEventEmitter,
    TouchableHighlight
} = React;

console.log(global.SERVER_PATH.slice(7), 'GLOBAL');

var sockets = new SocketIO(global.SERVER_PATH.slice(7), {});
sockets.connect();
sockets.on('connect', () => {
  sockets.on('queued', () => {
    Utils.queued();
  });
  sockets.on('calledOn', (data) => {
    Utils.calledOn(data[0]);
  });
});
var NativeViewBridge = require('NativeModules').NativeViewBridge;

//--------- Brige to native UIViewController , for webRTC (test) ------------
var NativeViewBridge = require('NativeModules').NativeViewBridge;
console.log('-------- native module mthods ------');
console.log(NativeViewBridge);
//--------------------------------------------------------------------------

//------------------- RCTDeviceEventEmitter --------------------

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


var HandRaiseButton = module.exports = React.createClass({

  getInitialState: function () {
    return {
      called: false,
      questionAsked: false
    };
  },

  
  componentDidMount: function() {


  var addedObserver = DeviceEventEmitter.addListener('NewMicEvent', function(data) {

      console.log("************ MIC END ====================");
      console.log("************ MIC END ===============");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");
      console.log("************ MIC END **********");


     
    });


  },


  componentWillMount: function () {
    Utils.addQueuedListener(this.queued);
    Utils.addCalledOnListener(this.calledOn);

  },

  componentWillUnmount: function () {
    Utils.removeQueuedListener(this.boundQueued);
    Utils.removeCalledOnListener(this.calledOn);
  },

  calledOn: function (data) {
    console.log('Called On', data);

    Utils.getAsyncStats()
      .then((item) => {
        var parsedItem = JSON.parse(item);
        var newItem = {
          classes: parsedItem.classes,
          handsRaised: parsedItem.handsRaised,
          calledsOn: parsedItem.calledsOn
        };
        Utils.setAsyncStats(JSON.stringify(newItem));
    });

    this.handleDone(data);

    NativeViewBridge.goToNative();
    
  },

  queued: function () {
    console.log("queued");
    this.setState({
      questionAsked: true
    });
  },

  handleHandRaise: function () {
    console.log("Hand Raise Request.");
    var self = this;


    Utils.getAsyncStats()
      .then((item) => {
        var parsedItem = JSON.parse(item);
        var newStats = {
          classes: parsedItem.classes,
          handsRaised: parsedItem.handsRaised + 1,
          calledsOn: parsedItem.calledsOn
        };
        Utils.setAsyncStats(JSON.stringify(newStats))
          .then(() => {
            this.props.onPress();
          });
      });

    AsyncStorage.getItem('QueUpCurrentUser').then((user) => {
      var parsedUser = JSON.parse(user);
      sockets.emit('handraise', {
        classID: this.props.data.selectedClass.classID,
        email: parsedUser.email,
        name: parsedUser.name,
        fbPicture: parsedUser.picture.data.url
      });
    });

  },

  handleDone: function (data) {
    this.setState({
      called: false,
      questionAsked: false
    }, () => {
      sockets.emit('studentReceivedCall', data);
    });
  },

  render: function () {

    if(!this.state.questionAsked)
      return (
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={this.handleHandRaise} >
            <Image
              style={styles.handIcon}
              source={require('image!handRaiseIcon')}
            />
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <View style={styles.textContainer}>
          <Text style={styles.raisedText}>Hand Raised...</Text>
        </View>
      );
  }

});

var HandRaiserView = module.exports = React.createClass({

  render: function () {
    return (
      <View style={styles.container}>
          <Text style={styles.ClassTitle}> {this.props.data.selectedClass.ClassTitle} </Text>
          <Stats />
          <View style={styles.handRaiseIcon}>
            <HandRaiseButton onPress={Utils.updateStats} data={this.props.data} />
         </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EC749'
  },

  ButtonContainer: {
    alignItems: "center"
  },

  TouchableOpacity: {
    top: 100,
    color: "#ff0000"
  },

  ClassTitle:{
    color: 'white'
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    borderTopColor: 'white',
    borderTopWidth: .5

  },
  handRaiseIcon: {
    height: DeviceHeight/1.4 
  },

  handIcon: { 
    top:40,
    height: 300,
    width: 230, 
  },
  textContainer: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  raisedText: { 
    fontSize: 40,
    top: -55,
    color: "#fff"
  },

  calledText: { 
    fontSize: 30,
    top: -40,
    color: "#fff"
  },
});