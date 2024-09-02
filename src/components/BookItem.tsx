import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {IBook} from '../types';
import {useNavigation} from '@react-navigation/native';

interface IBookItem extends IBook {
  isDescription?: boolean;
  isPressable?: boolean;
}

const BookItem = ({
  id,
  volumeInfo,
  isDescription = true,
  isPressable = true,
}: IBookItem) => {
  const {imageLinks, title, authors, pageCount, description, averageRating} =
    volumeInfo;

  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate({
          name: 'Book',
          params: {bookId: id},
        } as never)
      }
      disabled={!isPressable}>
      <Image
        source={{
          uri: imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.authors}>{authors?.join(', ')}</Text>
        {!!pageCount && <Text style={styles.pages}>pages: {pageCount}</Text>}
        {!!averageRating && (
          <Text style={styles.pages}>rating: {averageRating}</Text>
        )}
        {isDescription && (
          <Text style={styles.description} numberOfLines={8}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles: any = {
  container: {
    padding: 12,
    flexDirection: 'row',
    gap: 24,
  },
  image: {
    width: 200,
    height: 270,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textTransform: 'capitalize',
    gap: 12,
    color: '#fff',
  },
  authors: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#DB4782',
  },
  pages: {
    fontSize: 16,
    color: 'lightgray',
  },
  description: {
    fontSize: 14,
    color: 'lightgray',
  },
};

export default BookItem;
