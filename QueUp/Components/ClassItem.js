'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} = React;
var styles = StyleSheet.create({
    container: {
    	flex : 1,
    	padding : 10,
        flexDirection: 'row',
        borderBottomColor : '#ffffff',
        borderBottomWidth : .5,
        backgroundColor: '#18CFAA',
    },
    ClassList : {
    	flex : 1,
    	flexDirection : 'column'
    },
    ClassTitle : {
    	fontSize : 16,
    	color : 'white',
        textAlign: 'left',
        marginTop: 10,
        marginRight: 10,
        fontFamily: 'HelveticaNeue-Light',

    }
});

module.exports = React.createClass({
	render() {
		var item = this.props.item;
        console.log("------------------------------------------------");
        console.log(item);
        //onPress={() => ListView.addScore(item._id)}

		return (
            
			<TouchableOpacity onPress={() => this.props.onSelect(item)}>
				<View style={styles.container}>			
					<View style={styles.ClassList}>
						<Text style={styles.ClassTitle} numberOfLines={2}>{item.name}</Text>
					</View>					
				</View>
			</TouchableOpacity>
		);
	}
})