import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  ScrollView,
  View,
  Pressable,
  Linking,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import useBook from '../hooks/useBook';

import GoBack from '../components/GoBack';
import BookItem from '../components/BookItem';
import moment from 'moment';
import BookSummary from '../components/BookSummary';
import Divider from '../components/Divider';

const BookScreen = () => {
  const route = useRoute();

  const {bookId} = route?.params as any;

  const {data, isFetching, error} = useBook(bookId);
  const {width} = useWindowDimensions();

  if (isFetching || !data) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  const {
    categories,
    publisher,
    publishedDate,
    previewLink,
    description,
    title,
    authors,
  } = data!.volumeInfo;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GoBack />
      <BookItem {...data} isDescription={false} isPressable={false} />
      <View style={styles.categories}>
        {categories?.map((category: string) => (
          <Text style={styles.category} key={category}>
            {category}
          </Text>
        ))}
      </View>
      <Text style={styles.publisher}>
        Published by {publisher} on {moment(publishedDate).format('LL')}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL(previewLink)}>
        <Text style={styles.buttonText}>View on the site</Text>
      </Pressable>
      <RenderHtml
        baseStyle={styles.description}
        contentWidth={width}
        source={{html: description}}
      />
      <Divider />
      <BookSummary title={title} authors={authors} />
    </ScrollView>
  );
};

export default BookScreen;

const styles: any = {
  container: {
    backgroundColor: '#1F2937',
    gap: 12,
    padding: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  category: {
    borderWidth: 1,
    borderColor: '#DB4782',
    padding: 5,
    borderRadius: 5,
    color: '#DB4782',
    fontSize: 12,
    lineHeight: 12,
  },
  publisher: {
    color: 'lightgray',
    fontSize: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: '#DB4782',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  description: {
    color: 'lightgray',
    fontSize: 14,
  },
};
