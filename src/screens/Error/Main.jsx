import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Main({ navigation, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚠️ Something went wrong</Text>
      <Text style={styles.message}>
        {message || 'An unexpected error occurred.'}
      </Text>
      {navigation && (
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#721c24',
    textAlign: 'center',
    marginBottom: 20,
  },
});
