import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import useSearch from '../hooks/useSearch';
import BookItem from '../components/BookItem';
import Divider from '../components/Divider';

const HomeScreen = () => {
  const [query, setQuery] = useState('');

  const {data, refetch} = useSearch(query);

  return (
    <View style={styles.sectionContainer}>
      <SearchBar value={query} setValue={setQuery} onPress={refetch} />

      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => <BookItem {...item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <Divider />}
        />
      ) : (
        <Text
          style={{
            fontSize: 48,
            color: 'white',
            alignSelf: 'center',
          }}>
          SUPER DUPER AI BOOK
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  flatList: {
    padding: 12,
    gap: 12,
  },
});

export default HomeScreen;
