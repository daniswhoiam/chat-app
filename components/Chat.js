// Import packages
import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * This is the view that enables the main function of the app, which is chatting.
 * 
 * @param {Object} props Contains user's name, chosen color, and navigation 
 * @returns Rendered Chat View
 */
export default function Chat(props) {
  const { color } = props.route.params;

  return <View style={{ flex: 1, backgroundColor: `${color}` }}></View>;
}
