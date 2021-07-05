// Import packages
import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        },
        {
          _id: 1,
          text: `${this.props.route.params.name} has entered the chat`,
          createdAt: new Date(),
          system: true
        }
      ]
    });
  }

  onSend = (newMessages = []) => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, newMessages)
      };
    });
  };

  render() {
    const color = this.props.route.params.color;

    return (
      <View style={{ flex: 1, backgroundColor: `${color}` }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={newMessages => this.onSend(newMessages)}
          user={{ _id: 1 }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
