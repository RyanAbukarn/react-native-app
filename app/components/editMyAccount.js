import React , {useEffect,useContext,useState} from 'react';
import axios from 'axios';
import _AccountForm from '../components/_accountForm'
import {UserLoginInfo} from '../context/userLoginInfo'


const editAccountAPI =  (values,token) => {
    return axios.post("http://localhost:3000/api/v1/edit_my_account", {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        user: values,
    })
}
const myAccountAPI =  (token) => {
    return axios.get("http://localhost:3000/api/v1/my_account", 
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
}

export default function EditAccount ({navigation}){
    const [myValues,setMyValues] = useState({ fname: '' , lname: '' , email: '' , phone: '' , address: '' , state: '' , city: '' })
    const {userLoginInfo} = useContext(UserLoginInfo) 
    useEffect(()=>{
        const fetchData = async () => {
            const response = await myAccountAPI(userLoginInfo.token)     
            setMyValues(response.data.accountInfo);
        };
          fetchData();
    },[])
   return ( 
      <_AccountForm title="Update"  navigation={navigation} API={editAccountAPI} myValues={myValues} state={myValues.state}/>
   )
 }
