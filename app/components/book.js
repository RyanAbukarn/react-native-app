
import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const styles= StyleSheet.create({
    book: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },   
});

const Book = ({book}) => (
    <View>
        <Text style={styles.book}>{book.name}</Text>
    </View>
  );

export default Book;