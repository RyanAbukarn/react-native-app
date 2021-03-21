import React ,{useState, useContext} from 'react';
import {StyleSheet, Text,View, Button} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { queryCache } from 'react-query';
import {UserLoginInfo} from '../context/userLoginInfo'
import _BookingAPI from './_bookingAPI'


export default function _RentBook({title,url,start,end,Id,navigation}) {

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const ID = Id;
  const {userLoginInfo} = useContext(UserLoginInfo);
  return (
    <View >
      <Text style={styles.title}>Pick up by</Text>
      <DatePicker
          style={styles.datePickerStyle}
          date={startDate} // Initial date from state
          mode="datetime" // The enum of date, datetime and time
          placeholder="select start date"
          maxDate={endDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            setStartDate(date);
          }}
        />
        <Text style={styles.title}>Return by</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={endDate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select end date"
          mode="datetime"
          minDate={startDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            setEndDate(date);
          }}
        />
      <Button title={title} onPress={_=>{
        _BookingAPI(url,userLoginInfo.token,startDate,endDate,ID,ID).then(()=>{
          queryCache.invalidateQueries('books');
          queryCache.invalidateQueries('AllBooks');

          navigation.pop(1);
      });
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    height: 100,
    marginTop: 20,

  },
});
