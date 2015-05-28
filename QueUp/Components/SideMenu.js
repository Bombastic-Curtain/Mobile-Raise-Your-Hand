'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Animation
} = React;


var Router = require('react-native-router');

var ReactIcon = require("react-native-icons");



var ClassListView = require('../views/ClassList.js');
var AddClassView = require('../views/AddClass.js');

var DeviceWidth = require('Dimensions').get('window').width;
var DeviceHeight = require('Dimensions').get('window').height;

var reactTimerMixin = require('react-timer-mixin');

var AnimationExperimental = require('AnimationExperimental');




module.exports = React.createClass({
  mixins: [reactTimerMixin],
  componentWillMount: function() {
  },

  componentWillReceiveProps:function(){
  },

  render: function() {
    return (
      <View>
        <View style={styles.menuCol} ref="menuContent">
        <ScrollView style={{paddingTop:15}}>
            <TouchableOpacity underlayColor="#ffffff" onPress={()=>{ 
                global.router({
                    name: 'My Classes',
                    component: ClassListView,
                });
                this.setTimeout(()=>{
                  global.mainSideMenu.closeMenu();
                }, 20);
            }}>
                <View style={styles.SideMenuItem}>
                  <Text style={styles.ItemText}>MY CLASSES </Text>
                </View>
            </TouchableOpacity>

         <TouchableOpacity underlayColor="#FFD200" onPress={()=>{ 
            global.router({
                name: 'Add Classes',
                component: AddClassView,
            });
            
            this.setTimeout(()=>{
                global.mainSideMenu.closeMenu();
            }, 20);

            }}>
            <View style={styles.SideMenuItem}>
              <Text style={styles.ItemText}>ADD CLASSES  </Text>
            </View>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({

  menuCol: {
    top : 0,
    height: DeviceHeight + 110,
    width: DeviceWidth* 2,
    backgroundColor: '#FFD200',

  },

  SideMenuItem: {
    top: DeviceWidth/1.5,
    marginLeft: -10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 50,
    width: DeviceWidth,

  },
  MenuIcons: {
    position: 'absolute',
    left: 30,
    width: 40,
    height: 40,
  },


 ItemText: {
   marginLeft: -40,
   justifyContent: 'center',
   color: 'white',
   fontWeight: '800'

 }

});
