import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

interface ISearchBar {
  value: string;
  setValue: (value: string) => void;
  onPress: () => void;
}

const SearchBar = ({value, setValue, onPress}: ISearchBar) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Books"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onPress}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles: any = {
  container: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'white',
    margin: 12,
    padding: 12,
    fontSize: 15,
    flex: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#DB4782',
    margin: 12,
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
};

export default SearchBar;
