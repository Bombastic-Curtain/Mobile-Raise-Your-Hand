'use strict';
var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} = React;


var HeaderLogo = module.exports = React.createClass({
  render: function() {
    return (
      <Image
        style={styles.icon}
        source={require('image!QueUpLogo')}/>    
      )
  }
});

var styles = StyleSheet.create({
  icon: {
    top: 3,
    width: 70,
    height: 20
  }
});
