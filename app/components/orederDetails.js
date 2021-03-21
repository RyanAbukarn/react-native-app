import React ,{useContext} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import Moment from 'moment';
import { queryCache } from 'react-query'
import {UserLoginInfo} from '../context/userLoginInfo'
import _RentBook from './_rentBook'
import axios from 'axios'

const canacelOrder = (token,registrationID) => {
    return axios
    .delete("http://localhost:3000/api/v1/destroy_registration", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data:{book_id: registrationID}
    })
    .catch((error) => {
      console.log(error)
  })
};
export default function OrderDetails ({navigation})  {
    const bookDescribtion = navigation.getParam('describtion')
    const registrationID = navigation.getParam('registration_id')
    const checkIn = navigation.getParam('check_in')
    const checkOut = navigation.getParam('check_out')
    const iScheckIn = navigation.getParam('is_checked_in')
    const {userLoginInfo} = useContext(UserLoginInfo)

    return(
        <View>
    {
      iScheckIn ? 
      (
        <>
            <Text style={styles.title}>Date you picked up the Book {Moment(checkIn).format("MMM Do YY")}</Text>
            <Text style={styles.title}>Return Date {Moment(checkOut).format("MMM Do YY")}</Text>
        </>
      )
      :
      ( 
        <>

            <_RentBook url="/api/v1/update_registration" title={"Update"} Id={registrationID} navigation={navigation} start={checkIn} end={checkOut} />
            <Button title="Canacel order" onPress={()=>{
                canacelOrder(userLoginInfo.token,registrationID).then(()=>{
                  queryCache.invalidateQueries('books');
                  queryCache.invalidateQueries('AllBooks');
                  navigation.pop(1);
                })
            }}/>
        </>

      )
    }
        </View>
    );
}
const styles= StyleSheet.create({
  book: {  
      padding: 10,  
      fontSize: 18,  
      height: 44,  
  },
  title: {
   textAlign: 'center',
   fontSize: 20,
   fontWeight: 'bold',
   padding: 20,
 }   
});

