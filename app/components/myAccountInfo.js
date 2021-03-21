import React, {useContext} from 'react';
import {StyleSheet,View, Text} from 'react-native';
import {UserLoginInfo} from '../context/userLoginInfo'
import {useQuery} from 'react-query'

import axios from 'axios'
const myAccountAPI = (token) => {
    return  axios.
        get("http://localhost:3000/api/v1/my_account", 
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
}


const MyAccountInfo = ({navigation}) => {
    
    const {userLoginInfo} = useContext(UserLoginInfo)
    const {data, status} = useQuery("accountInfo", async ()=>{ 
        const {data} = await myAccountAPI(userLoginInfo.token);
        return data["accountInfo"];
    });

    return(
        <>
            {status === "error" && <Text>Error fetching data</Text>}
            {status === "loading" && <Text>Fetching data...</Text>}
            {status === "success" &&     
            <View style={styles.container}>
                <Text style={styles.title}>Full Name: {`${data["lname"]}, ${data["fname"]}`}</Text>
                <Text style={styles.title}>My address: {`${data["address"]}, ${data["city"]} ${data["state"]}`}</Text>
                <Text style={styles.title}>My Email: {`${data["email"]}`}</Text>
                <Text style={styles.title}>My Phone: {`${data["phone"]}`}</Text>
            </View>}
        </>
    );
}
const styles= StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 10,
      }         
 });
export default MyAccountInfo;