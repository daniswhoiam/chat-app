// Import packages
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

// Import SVG as custom component for easier handling
import UserIcon from '../assets/user_icon.svg';

/**
 * Main component that user sees when starting the App. Here, the user can set a username and a custom color.
 *
 * @param {Object} props Contains navigation
 * @returns Rendered Start Component
 */
export default function Start(props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // The colors from which the user can select.
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('../assets/background.png')}
    >
      <Text style={styles.mainHeader}>Chat-App</Text>
      <View style={[styles.controlStyles, styles.controlContainer]}>
        <View style={[styles.controlStyles, styles.nameInput]}>
          {/* SVG as custom component UserIcon */}
          <UserIcon width={16} height={32} />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            style={[styles.standardText, styles.nameInputText]}
          />
        </View>
        <View style={styles.controlStyles}>
          <Text style={[styles.standardText, { alignSelf: 'flex-start' }]}>
            Choose Your Background Color:
          </Text>
          <View style={[styles.controlStyles, styles.colors]}>
            {colors.map((arrayColor, index) => {
              return (
                /* Enables to maintain a frame around the selected color */
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
                  {/* Color buttons - as TouchableOpacity for styling flexibility */}
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
          style={[styles.controlStyles, styles.startChatting]}
        >
          <Text style={(styles.standardText, { color: '#ffffff' })}>
            Start Chatting
          </Text>
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
  standardText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083'
  },
  controlStyles: {
    width: '88%',
    alignItems: 'center'
  },
  controlContainer: {
    height: '44%',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  nameInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10
  },
  nameInputText: {
    marginLeft: 5,
    opacity: 0.5
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 50,
    justifyContent: 'center'
  }
});
