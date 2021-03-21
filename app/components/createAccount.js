import React from 'react';
import axios from 'axios';
import _AccountForm from '../components/_accountForm'


const createAccountAPI = (values,token) => {
  return axios
  .post("http://localhost:3000/api/v1/authenticate/newAccount", {
    headers: {
      'Content-Type': 'application/json',
    },
    user: values,
  })
}

 export default function AccountForm ({navigation}){ 
    const myValues = { fname: '' , lname: '' , email: '' , phone: '' , address: '' , state: '' , city: '' }
   return ( 
      <_AccountForm title="Create" navigation={navigation} API={createAccountAPI} myValues={myValues} state={myValues.state}/>
   )
 }
