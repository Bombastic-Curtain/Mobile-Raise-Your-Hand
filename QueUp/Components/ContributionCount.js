var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;



var ContributionCount = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <Text style={styles.count}> 23.6 </Text>
        <Text style={styles.minutes}>Avg. Qs per Week</Text>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#6EC749',
    paddingBottom: 10
  },
  count: {
    alignSelf: 'center',
    fontSize: 71,
    fontFamily: 'HelveticaNeue-Light',
    marginTop: 10,
    marginBottom: 0,
    color: 'white'
  },
  minutes: {
    alignSelf: 'center',
    fontSize: 21,
    fontFamily: 'HelveticaNeue-Light',
    marginTop:0,
    marginBottom: 5,
    color: 'white'
  },
 
});


module.exports = ContributionCount;