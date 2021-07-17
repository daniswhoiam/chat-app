// Import external packages
import React, { useState, useEffect, useRef } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
// Internal modules
import { db, auth } from '../firebase';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

/**
 * This is the view that enables the main function of the app, which is chatting.
 *
 * Inspired by https://github.com/jjla26
 *
 * @param {Object} props Contains user's name, chosen color, and navigation
 * @returns Rendered Chat View
 */
export default function Chat(props) {
  // To be able to avoid useEffects() calls on first Render
  const firstRender = useRef(true);
  // Initiate state
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  // Equivalent to componentDidMount()
  useEffect(() => {
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
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
      } else {
        // User is offline, load saved messages
        setIsConnected(false);
        getMessages();
      }
    });
  }, []);

  /* Save messages to local storage each time that message state changes */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    saveMessages();
  }, [messages]);

  /**
   * Adds the new message to the database
   *
   * @param {Array} newMessage Array containing the new message that is being sent
   */
  const onSend = async (newMessage = []) => {
    const message = {
      _id: newMessage[0]._id,
      createdAt: newMessage[0].createdAt,
      text: newMessage[0].text,
      user: {
        _id: user,
        name: props.route.params.name
      },
      image: newMessage[0].image || null,
      location: newMessage[0].location || null
    };
    // Push message to firestore
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
        },
        image: data.image || null,
        location: data.location || null
      });
    });
    setMessages(allMessages);
  };

  /**
   * Loads saved messages from local storage (if user is offline).
   */
  const getMessages = async () => {
    let storedMessages = '';
    try {
      storedMessages = (await AsyncStorage.getItem('messages')) || [];
      setMessages(JSON.parse(storedMessages));
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Saves messages to local storage.
   */
  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Allows to delete messages.
   */
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Renders CustomAction Button
   *
   * @param {Object} actionProps Props from GiftedChat component
   * @returns Renders CustomActions component
   */
  const renderCustomActions = actionProps => {
    return <CustomActions {...actionProps} />;
  };

  /**
   * Enables to show a map to display the sent/received location
   *
   * @param {Object} customViewProps Props from GiftedChat component
   * @returns Renders MapView component or nothing if message does not contain location info
   */
  const renderCustomView = customViewProps => {
    const { currentMessage } = customViewProps;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: `${props.route.params.color}` }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: user }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#000'
                }
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          // Prevent user from sending messages in offline mode
          if (!isConnected) {
          } else {
            return <InputToolbar {...props} />;
          }
        }}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
