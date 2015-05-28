'use strict'
var React = require('react-native');

var {
  AsyncStorage
} = React;

var statsUpdateListeners = [];
var queuedListeners = [];
var calledOnListeners = [];

exports.getAsyncStats = function () {
  return AsyncStorage.getItem('stats');
};

exports.setAsyncStats = function (stats) {
  return AsyncStorage.setItem('stats', stats);
};

exports.addCalledOnListener = function (callback) {
  console.log("Called On Listener Added.");
  calledOnListeners.push(callback);
};

exports.removeCalledOnListener = function (callback) {
  console.log("Removing Called On Listener.");
  calledOnListeners.forEach((cb, i) => {
    if(cb === callback)
      calledOnListeners.splice(i,1);
  });
};

exports.addQueuedListener = function (callback) {
  console.log("Queued Listener Added.");
  queuedListeners.push(callback);
};

exports.removeQueuedListener = function (callback) {
  console.log("Removing Queued Listener.");
  queuedListeners.forEach((cb, i) => {
    if(cb === callback)
      queuedListeners.splice(i,1);
  });
};

exports.addUpdateStatsListener = function (callback) {
  console.log("Update Stats Listener Added.");
  statsUpdateListeners.push(callback);
};

exports.removeUpdateStatsListener = function (callback) {
  console.log("Removing Update Stats Listener.");
  statsUpdateListeners.forEach((cb, i) => {
    if(cb === callback)
      statsUpdateListeners.splice(i,1);
  });
};

exports.calledOn = function (data) {
  console.log("updating called on...");
  calledOnListeners.forEach((callback) => {
    callback(data);
  });
};

exports.queued = function () {
  console.log("updating queued...");
  queuedListeners.forEach((callback) => {
    callback();
  });
};

exports.updateStats = function () {
  console.log("updating stats...");
  exports.getAsyncStats()
    .then((item) => {
      if(item !== null){
        var parsedItem = JSON.parse(item);
        statsUpdateListeners.forEach((callback) => {
          callback(parsedItem);
        });
      }
    });
};