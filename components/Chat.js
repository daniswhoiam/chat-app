import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Chat(props) {
  const { color } = props.route.params;

  return <View style={{ flex: 1, backgroundColor: `${color}` }}></View>;
}
