import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import { View, FlatList , StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet.js'

const App = () => <Routes />

const urlBase = 'http://192.168.0.16:3000';//para conectar simulando no mobile
//'http://localhost:3000',//para conectar simulando no IOS
//'http://10.0.3.2:3000',//para conectar Genymotin ou android simulador


export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Inicio",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')} >
        <Icon 
          style={{marginRight: 20}}
          name="add-circle-outline"
          size={24}
          color="#4bb0ee"
        />
      </TouchableOpacity>
    ),
  });

  state = {
    tweets : [],
  };

  async componentDidMount () {
    this.subscribeToEvents();

    const response = await api.get('tweets');
   
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket(urlBase);

    io.on('tweet', data =>{
        this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', data =>{
        this.setState({ tweets: this.state.tweets.map( vartweet =>
            vartweet._id === data._id ? data : vartweet
        ) })
    });
}

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={ ({item}) =>  <Tweet tweet={item} />}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
