var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;



var UserBadgeSide = React.createClass({

  render: function(){
    console.log(this.props.currentUser, "User OBJECT");
    var userObj = JSON.parse(this.props.currentUser);
    var avatarWidth = this.props.avatarWidth;
    var avatarHeight = this.props.avatarHeight;
    var name = this.props.noText ? null : <Text style={styles.name}> {userObj.name} </Text>;
    console.log(this.props.noText, "text", name, "name")
    return (
      <View style={styles.container}>
        <Image
          style={[styles.userAvatar, !!avatarWidth && {width: avatarWidth, height: avatarHeight}]}
          source={{uri: userObj.picture.data.url}}
        />
        {name}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    left: 0,
    marginLeft: -20,
    paddingBottom: 5,
  },

  name: {
    alignSelf: 'center',
    fontSize: 21,
    fontWeight: "200",
    fontFamily: 'HelveticaNeue',
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },

  userAvatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: 'white',
    marginTop: 0,
    alignSelf: 'center'
  }
});


module.exports = UserBadgeSide;