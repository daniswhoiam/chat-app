import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import UserIcon from '../assets/user_icon.svg';

export default function Start(props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('../assets/background.png')}
    >
      <Text style={styles.mainHeader}>Chat-App</Text>
      <View style={styles.controlContainer}>
        <View style={styles.nameInput}>
          <UserIcon width={16} height={32} />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            style={[styles.nameInputText, { marginLeft: 5 }]}
          />
        </View>
        <View style={styles.colorContainer}>
          <Text
            style={[
              styles.nameInputText,
              { opacity: 1, alignSelf: 'flex-start' }
            ]}
          >
            Choose Your Background Color:
          </Text>
          <View style={styles.colors}>
            {colors.map((arrayColor, index) => {
              return (
                <View
                  key={index}
                  style={
                    arrayColor === color
                      ? [
                          styles.colorFrameActive,
                          styles.colorFrame,
                          { borderColor: color }
                        ]
                      : styles.colorFrame
                  }
                >
                  <TouchableOpacity
                    style={[
                      styles.colorButton,
                      { backgroundColor: `${arrayColor}` }
                    ]}
                    onPress={() => {
                      setColor(arrayColor);
                    }}
                  ></TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Chat', { name, color })}
          title="Start Chatting"
          accessibilityLabel="Press here to start chatting"
          style={styles.startChatting}
        >
          <Text style={styles.startChattingText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mainHeader: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff'
  },
  controlContainer: {
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  nameInput: {
    flexDirection: 'row',
    width: '88%',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10
  },
  nameInputText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5
  },
  colorContainer: {
    alignItems: 'center',
    width: '88%'
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginTop: 10
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  colorFrame: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorFrameActive: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderWidth: 2
  },
  startChatting: {
    backgroundColor: '#757083',
    width: '88%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startChattingText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff'
  }
});
