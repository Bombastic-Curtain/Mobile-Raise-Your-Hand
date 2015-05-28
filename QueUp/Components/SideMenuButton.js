'use strict';
var React = require('react-native');

var {
  View,
  StyleSheet,
  TouchableOpacity,
} = React;

var Icon = require("react-native-icons");

module.exports = React.createClass({
  render: function() {

    return (
      <TouchableOpacity onPress={()=>{ global.mainSideMenu.toggleMenu(); }}>
          <Icon
            name='fontawesome|bars'
            size={20}
            color='#ffffff'
            style={styles.menuBarIcon}/>
      </TouchableOpacity>
    )
  }
});

var styles = StyleSheet.create({
  menuBarIcon: {
    width: 39,
    height: 49
  }
});
