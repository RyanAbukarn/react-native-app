import React ,{useState, useContext} from 'react';
import _RentBook from './_rentBook'
import _BookingAPI from './_bookingAPI'

export default function Rent({Id,navigation}) {


  return (
    <_RentBook title={"Order"} url={"/api/v1/rent"} Id={Id} navigation={navigation} start={""} end={""} />
  );
}


