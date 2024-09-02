import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import useAI from '../hooks/useAI';

interface IBookSummary {
  title: string;
  authors: string[];
}

const BookSummary = ({title, authors}: IBookSummary) => {
  const {width} = useWindowDimensions();

  const prompt = `Generate a detailed book summary of the book titled ${title} by ${authors.join(
    ', ',
  )}. use proper HTML tags to format the summary.`;

  const {data, isFetching, error, refetch} = useAI(prompt);

  if (isFetching) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  if (error) {
    return <Text>Error!!!</Text>;
  }

  if (data) {
    return (
      <RenderHtml
        baseStyle={styles.description}
        contentWidth={width}
        source={{html: data}}
      />
    );
  }

  return (
    <Pressable style={styles.button} onPress={async () => await refetch()}>
      <Text style={styles.buttonText}>AI Summary</Text>
    </Pressable>
  );
};

export default BookSummary;

const styles: any = {
  button: {
    borderWidth: 1,
    backgroundColor: '#DB4782',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'lightgray',
    fontSize: 14,
  },
};
