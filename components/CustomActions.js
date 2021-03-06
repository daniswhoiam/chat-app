// Import external packages
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';

export default class CustomActions extends React.Component {
  /**
   * Lets user send image from his library
   */
  imagePicker = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(error => console.log(error));
        if (!result.cancelled) {
          const imageURL = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageURL, text: '' });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Lets user take a picture with his camera and send it
   */
  takePhoto = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    try {
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).catch(error => console.log(error));
        if (!result.cancelled) {
          const imageURL = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageURL, text: '' });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Uploads the image to Firebase
   *
   * @param {String} uri Local path to image
   * @returns Promise to receive path to image in storage
   */
  uploadImageFetch = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('XMLHttpRequest failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  /**
   * Lets user send his current location
   */
  getLocation = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND
    );
    try {
      if (status === 'granted') {
        const result = await Location.getCurrentPositionAsync({}).catch(error =>
          console.log(error)
        );

        const longitude = result.coords.longitude;
        const latitude = result.coords.latitude;

        if (result) {
          this.props.onSend({
            location: {
              longitude: longitude,
              latitude: latitude
            },
            text: ''
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Opens action sheet to choose an action
   */
  onActionPress = () => {
    const options = [
      'Choose from Library',
      'Take Picture',
      'Send Location',
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    this.context
      .actionSheet()
      .showActionSheetWithOptions(
        { options, cancelButtonIndex },
        async buttonIndex => {
          switch (buttonIndex) {
            case 0:
              return this.imagePicker();
            case 1:
              return this.takePhoto();
            case 2:
              return this.getLocation();
          }
        }
      );
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Chat options"
        accessibilityHint="Choose to send images or location"
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};
