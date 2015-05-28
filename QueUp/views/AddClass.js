'use strict';
var React = require('react-native');
var Utils = require('../utils/utils.js');
var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} = React;

var AddClassView = module.exports = React.createClass({

  getInitialState: function () {
    return {
      serverResponse: "zzzzz"
    };
  },

  handleJoin: function (data) {
    console.log("Making Request.");
    var self = this;
    AsyncStorage.getItem("FBToken")
      .then((user) => {
        console.log(user);
        fetch("http://10.6.31.151:8000/api/students/joinClass", {
          method: "POST",
          headers: {
            user_role: 'student',
            access_token: user,
            'Content-Type': "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(function (res) {
          console.log(res._bodyText);
          self.setState({
            serverResponse: res._bodyText
          });
        });
      });
  },



  render: function () {
    var inClass = "You're already in this class."
    if(this.state.serverResponse === "invalidID"){
      return (
        <View style={styles.container}>
          <ClassCodeInput handleJoin={this.handleJoin} />
          <Text style={styles.invalidText}>Invalid Class ID.</Text>
        </View>
      );
    }
    else if(this.state.serverResponse === "alreadyJoinedClass") {
      return (
        <View style={styles.container}>
          <ClassCodeInput handleJoin={this.handleJoin} />
          <Text style={styles.invalidText}>{inClass}</Text>
        </View>
      );
    }
    else if(this.state.serverResponse === "") {
      Utils.getAsyncStats()
        .then((item) => {
          var parsedItem = JSON.parse(item);
          var newItem = {
            classes: parsedItem.classes + 1,
            handsRaised: parsedItem.handsRaised,
            calledsOn: parsedItem.calledsOn
          };
          console.log(newItem);
          Utils.setAsyncStats(JSON.stringify(newItem));
        });
      return (
        <View style={styles.container}>
          <ClassCodeInput handleJoin={this.handleJoin} />
          <Text style={styles.invalidText}>Class Joined!</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ClassCodeInput handleJoin={this.handleJoin} />
        </View>
      ); 
    }
  }

});

var ClassCodeInput = React.createClass({

  getInitialState: function () {
    return {
      classID: ""
    }
  },

  handlePress: function () {
    this.props.handleJoin(this.state);
  },

  render: function () {
    return (
      <View style={styles.ClassCodeInput}>
        <TextInput
          style={styles.textInput}
          placeholder={"4 digit class ID"}
          onChangeText={(text) => this.setState({classID: text})}
        />
        <TouchableHighlight
          onPress={this.handlePress}          
          underlayColor="white"
          style={styles.button}>
          <Text style={styles.buttonText}> Add Class </Text>
       </TouchableHighlight>
      </View>
    );
  }

});

  var width = require('Dimensions').get('window').width;
  var height =  require('Dimensions').get('window').height;
  console.log(height, 'HEIGHT')
var styles = StyleSheet.create({
  invalidText: {
    color: "#fff",
    fontSize: 30,
    top: -75
  },

  ClassCodeInput: {

  },

  textInput: {
    top: height * .2,
    height: 50,
    width:  width * .5,
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  button: {
    top: height * .2,
    width: width * .5,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent:'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#18CFAA',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#18CFAA'
  }
});