// Import external packages
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function CustomActions(props) {
  const onActionPress = () => {
    const options = [
      'Choose from Library',
      'Take Picture',
      'Send Location',
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    useContext(CustomActionContext)
      .actionSheet()
      .showActionSheetWithOptions(
        { options, cancelButtonIndex },
        async buttonIndex => {
          switch (buttonIndex) {
            case 0:
              console.log('User wants to pick an image');
              return;
            case 1:
              console.log('User wants to take a photo');
              return;
            case 2:
              console.log('User wants to get their location');
            default:
          }
        }
      );
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={onActionPress}>
      <View style={[styles.wrapper, props.wrapperStyle]}>
        <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
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
