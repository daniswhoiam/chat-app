// Import packages
import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'Please wait, you are getting logged in'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDQPor7wk0hOlrSBe6DOeM-zY4B7mOi4TI',
        authDomain: 'test-4a175.firebaseapp.com',
        projectId: 'test-4a175',
        storageBucket: 'test-4a175.appspot.com',
        messagingSenderId: '20091337538',
        appId: '1:20091337538:web:dde10fb1308cd141c366db'
      });
    }
  }

  componentDidMount() {
    this.referenceMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        loggedInText: 'Hello there'
      });

      this.referenceMessagesUser = firebase
        .firestore()
        .collection('messages')
        .where('uid', '==', this.state.uid);
      this.unsubscribeMessagesUser = this.referenceMessagesUser
        /* .orderBy('createdAt', 'desc') */
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeMessagesUser();
  }

  onSend = (newMessages = []) => {
    this.setState(
      previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, newMessages)
        };
      },
      () => this.addMessage()
    );
  };

  addMessage = () => {
    const newMessage = this.state.messages[0];
    this.referenceMessages.add({
      createdAt: new Date(),
      system: false,
      text: newMessage.text,
      user: {
        _id: this.state.uid,
        name: this.props.route.params.name
      }
    });
  };

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        createdAt: data.createdAt,
        system: data.system,
        text: data.text,
        user: data.user
      });
    });
    this.setState({
      messages
    });
  };

  render() {
    const color = this.props.route.params.color;

    return (
      <View style={{ flex: 1, backgroundColor: `${color}` }}>
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          messages={this.state.messages}
          onSend={newMessages => this.onSend(newMessages)}
          /* user={{ _id: 1 }} */
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
