'use strict';
var React = require('react-native');
var SocketIO = require('react-native-swift-socketio');

var LargeNumberBlock = require('../Components/LargeNumberBlock.js');


var DeviceWidth = require('Dimensions').get('window').width;
var DeviceHeight = require('Dimensions').get('window').height;



var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  AsyncStorage
} = React;
console.log("Before Socket");
var sockets = new SocketIO("10.6.31.151:8000", {});
sockets.connect();
sockets.on('connect', () => {
  console.log('Socket connected.');
});

var HandRaiserView = module.exports = React.createClass({

  getInitialState: function () {
    return {
      called: false,
      intervalId: 0
    };
  },

  handleHandRaise: function () {
    console.log("Hand Raise Request.");
    // console.log(JSON.stringify(this.props));
    AsyncStorage.getItem('QueUpCurrentUser').then((user) => {
      var parsedUser = JSON.parse(user);
      console.log(parsedUser.email);
      sockets.emit('handraise', {
        classID: this.props.data.selectedClass.classID,
        email: parsedUser.email
      });
    });
  },

  componentWillMount: function () {
    // this.setState({
    //   intervalId: setInterval(() => {
    //     fetch("http://localhost:8000/isCalled", {
    //     method: "GET",
    //     token:"TOKEN",
    //     })
    //     .then(function (res) {
    //       this.handleCalledOn();
    //     }.bind(this));
    //   }, 700)
    // });
  },

  handleCalledOn: function (res) {
    this.setState({
      called: true
    });
  },

  handleBack: function () {
  },

  render: function () {
    console.log("------------------------ class title props -----------------> ");
    console.log(this.props.data.selectedClass.ClassTitle);
    return (
      <View style={styles.container}>

          <Text style={styles.ClassTitle}> {this.props.data.selectedClass.ClassTitle} </Text>

          <View style={styles.iconContainer} ref="dashBoardIcon">
            <LargeNumberBlock value={'10'} label={'Classes'}  />
            <LargeNumberBlock value={'12'} label={'Questions'} />
            <LargeNumberBlock value={'12'} label={'Questions'} />
          </View>

          <View style={styles.handRaiseIcon}>
          <TouchableOpacity onPress={this.handleHandRaise} >
               <Image
              style={styles.handIcon}
              source={require('image!handRaiseIcon')}/>  
         </TouchableOpacity>
         </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
        backgroundColor: '#18CFAA'

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

});