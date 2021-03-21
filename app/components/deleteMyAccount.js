import React, {useState,useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {UserLoginInfo} from '../context/userLoginInfo'

import axios from 'axios'
const deleteMyAccountAPI = (token) => {
    return  axios.
        delete("http://localhost:3000/api/v1/delete_my_account", 
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
}

export default function DeleteMyAccount({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("Are You sure you want to delete your account");

  const {userLoginInfo,setUserLoginInfo} = useContext(UserLoginInfo)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


    return (
      <View style={styles.container}>
        <Button title="Delete" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text>{message}</Text>
            <Button title="YES I WANT TO DELETE MY ACCOUNT" onPress={()=>{
                deleteMyAccountAPI(userLoginInfo.token).then(({data})=>{
                    if (data.statues){
                        toggleModal();
                        setUserLoginInfo({});
                    }
                    else{
                        setMessage("You own us books can't delete your account")
                    }
                })
            }} />
            <Button title="NO" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
  }
});