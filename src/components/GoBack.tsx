import React from 'react';
import {Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GoBack = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable style={styles.button} onPress={handleGoBack}>
      <Text style={styles.buttonText}>Go Back</Text>
    </Pressable>
  );
};

const styles: any = {
  button: {
    backgroundColor: '#DB4782',
    margin: 12,
    padding: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
  },
};

export default GoBack;
