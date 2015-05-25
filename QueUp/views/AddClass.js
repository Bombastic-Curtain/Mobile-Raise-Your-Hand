'use strict';
var React = require('react-native');
var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight
} = React;

var AddClassView = module.exports = React.createClass({

  getInitialState: function () {
    return {
      code: ""
    };
  },

  handleJoin: function () {
    console.log("Making Request.");
    fetch("http://localhost:3000/checkCode", {
      method: "POST",
      token:"TOKEN",
      body: this.state.code
    })
    .then(function (res) {
      console.log(res);
    });
  },



  render: function () {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder={"4 digit class ID"}
            onChangeText={(text) => this.setState({code: text})}
          />
        </View>

      <TouchableHighlight
          style={styles.button}
          onPress={this.handleJoin}          
          underlayColor="white">
          <Text style={styles.buttonText}> Add Class </Text>
      </TouchableHighlight>


      </View>
    );
  }

});

var styles = StyleSheet.create({
  textInput: {
    top:50,
    height: 50,
    width:200,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  button: {
    top: 200,
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#18CFAA',
    alignSelf: 'center'
  },

  textDisplay: {
    top: 90,
    color: "#000"
  },

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#18CFAA'
  },

  TouchableOpacity: {
    top: 100,
    color: "#ff0000"
  }
});