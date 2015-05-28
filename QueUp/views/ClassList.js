'use strict';
var React = require('react-native');
var {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ListView,
  AsyncStorage
} = React;

var HandRaiserView = require('./HandRaiser.js');


var ClassItem = require('../Components/ClassItem.js');


var HeaderLogo = require('../Components/HeaderLogo.js');


var ClassListView = module.exports = React.createClass({

  getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})        
        };
    },

  handleAddPress: function () {
  },

  handleClassPress: function () {
  },

  handleBack: function () {
  },

  componentDidMount: function() {
    var self = this;
    AsyncStorage.getItem("FBToken")
      .then((user) => {
        fetch("http://10.6.31.151:8000/api/students/classList", {
          method: "GET",
          headers: {
            user_role: 'student',
            access_token: user,
          }
        })
        .then(function (res) {
          res.json().then((data) => {
            self.setState({ dataSource: self.state.dataSource.cloneWithRows(data) }, function(){
            });
          });
        });
      });

  },


  renderListView : function(){
    return(
      <ListView contentInset={{top: -64}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}/>
    );
  },


  renderRow: function(item) {
    return (
      <ClassItem item={item} onSelect={ (item) =>  {
             this.props.toRoute({
              name: item.name,
              component: HandRaiserView,
              data: {selectedClass: item},
              titleComponent: HeaderLogo
            });
      }} />
    );
  },


  render: function () {
    return (
      this.renderListView()
    );
  }

});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 50,
    backgroundColor: '#18CFAA'
  },

  container: {
    flex: 1,
    alignItems: "center"
  },

  TouchableOpacity: {
    top: 100,
    color: "#ff0000"
  }
});