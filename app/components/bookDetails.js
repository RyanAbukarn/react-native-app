import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Rent from '../components/rent'

const styles= StyleSheet.create({

   book: {  
       padding: 10,  
       fontSize: 18,  
       height: 44,  
   },   
});

const BookDetails = ({navigation}) => {
    const bookDescribtion = navigation.getParam('describtion')
    const bookid = navigation.getParam('id')
    return(
        <View>
            <Text style={styles.item}>{bookDescribtion}</Text>
            <Rent Id={bookid} navigation={navigation}/>
        </View>
    );
}

export default BookDetails;