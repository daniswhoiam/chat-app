// Import packages
import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, auth } from '../firebase';

/**
 * This is the view that enables the main function of the app, which is chatting.
 *
 * Inspired by https://github.com/jjla26
 *
 * @param {Object} props Contains user's name, chosen color, and navigation
 * @returns Rendered Chat View
 */
export default function Chat(props) {
  // Initiate state
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // Euqivalent to componentDidMount()
  useEffect(() => {
    let unsubscribeMessages = () => {};
    // Authentication of the user
    let authUnsubscribe = auth.onAuthStateChanged(async user => {
      if (!user) {
        try {
          await auth.signInAnonymously();
        } catch (error) {
          console.log(error);
        }
      }
      setUser(user.uid);
      // Establishing connection with firestore
      unsubscribeMessages = db
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(onCollectionUpdate);
    });

    // Equivalent of componentWillUnmount()
    return () => {
      authUnsubscribe();
      unsubscribeMessages();
    };
  }, []);

  /**
   * Adds the new message to the database
   *
   * @param {Array} newMessage Array containing the new message that is being sent
   */
  const onSend = (newMessage = []) => {
    const message = {
      _id: newMessage[0]._id,
      createdAt: newMessage[0].createdAt,
      text: newMessage[0].text,
      user: {
        _id: user,
        name: props.route.params.name
      }
    };
    db.collection('messages').add(message);
  };

  /**
   * Update list of messages if new ones appear
   *
   * @param {Object} querySnapshot Snapshot of the collection in the database
   */
  const onCollectionUpdate = querySnapshot => {
    const allMessages = [];
    querySnapshot.forEach(doc => {
      let data = doc.data();
      allMessages.push({
        _id: doc.id,
        createdAt: data.createdAt.toDate(),
        system: data.system,
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name
        }
      });
    });
    setMessages(allMessages);
  };

  return (
    <View style={{ flex: 1, backgroundColor: `${props.route.params.color}` }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: user }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
