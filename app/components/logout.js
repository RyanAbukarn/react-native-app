import React,{useContext, useEffect} from 'react';
import {UserLoginInfo} from '../context/userLoginInfo'

const Logout = ({navigation}) => {
  const {setUserLoginInfo} = useContext(UserLoginInfo);
  useEffect(() => {
        setUserLoginInfo({})
        navigation.navigate('Login')
    }, []);
    return (
        <>
        </>
    );
}

export default Logout;