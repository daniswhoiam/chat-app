// Import packages
import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

/**
 * This is the view that enables the main function of the app, which is chatting.
 *
 * @param {Object} props Contains user's name, chosen color, and navigation
 * @returns Rendered Chat View
 */
export default function Chat(props) {
  const { color, name } = props.route.params;
  
  const [messages, setMessages] = useState([]);
  // Functional Component Equivalent of componentDidMount()
  useEffect(() => {
    setMessages([
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
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true
      }
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  return (
    <View style={{ flex: 1, backgroundColor: `${color}` }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: 1 }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
