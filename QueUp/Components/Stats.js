'use strict'

var React = require('react-native');
var Utils = require('../utils/utils.js');
var LargeNumberBlock = require('./LargeNumberBlock.js');

var {
  View,
  StyleSheet,
  AsyncStorage
} = React;

var Stats = module.exports = React.createClass({

  getInitialState: function () {
    return {
      classes: '0',
      handsRaised: '0',
      calledsOn: '0'
    };
  },

  componentWillMount: function () {
    Utils.addUpdateStatsListener(this.getStats);
    Utils.updateStats();
  },

  componentWillUnmount: function () {
    Utils.removeUpdateStatsListener(this.boundGetStats);
  },

  getStats: function (item) {
    this.setState({
      classes: item.classes,
      handsRaised: item.handsRaised,
      calledsOn: item.calledsOn
    });
  },

  render: function () {
    return (
      <View style={styles.iconContainer} >
        <LargeNumberBlock value={this.state.classes} label={'Classes'} />
        <LargeNumberBlock value={this.state.handsRaised} label={'Hands Raised'} />
        <LargeNumberBlock value={this.state.calledsOn} label={'Contributions'} />
      </View>
    );
  }

});

var styles = StyleSheet.create({

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    borderTopColor: 'white',
    borderTopWidth: .5
  }

});