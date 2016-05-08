'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Image,
	Text,
	View,
} = React;


var LargeNumberBlock = React.createClass({
	
	render: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.value}>{this.props.value}</Text>
				<Text style={styles.label}>{this.props.label}</Text>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: 80,
		padding: 20,
		borderRightColor: 'white',
    borderRightWidth: .5,
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    borderTopColor: 'white',
    borderTopWidth: .5
	},

	value: {
		flex: 1,
		fontSize: 19,
		fontWeight: '800',
		color: 'white',
		textAlign: 'center',

	},

	label: {
		flex: 1,
		fontSize: 12,
		color: 'white',
		textAlign: 'center'
	},
});

module.exports = LargeNumberBlock;
