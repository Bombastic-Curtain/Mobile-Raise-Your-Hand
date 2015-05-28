var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;



var UserBadge = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <Image style={styles.userAvatar} source={{uri: this.props.currentUser.currentUserPicture}}/>
        <Text style={styles.name}> {this.props.currentUser.currentUserName} </Text>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#18CFAA',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    fontFamily: 'HelveticaNeue-Light',
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  userAvatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 10,
    alignSelf: 'center'
  }
});


module.exports = UserBadge;