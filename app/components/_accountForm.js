import React,{useEffect,useState,useContext} from 'react';
import { StyleSheet, Button, TextInput,Text, View } from 'react-native';
import stateHash from '../sheared/states'
import { Formik } from 'formik';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import {UserLoginInfo} from '../context/userLoginInfo'
import { queryCache } from 'react-query'
import {createAccountValidationSchema} from '../sheared/inputValidation' 


const citiesAPI = (state) => {
  return axios
  .get(`http://localhost:3000/cities/${state}`, { 
  })
};

 export default function _AccountForm ({title,navigation,API,myValues,state}){ 
    const [cities, setCities] = useState([])
    const {userLoginInfo, setUserLoginInfo} = useContext(UserLoginInfo)
    
    useEffect(()=>{
        const fetchData = async () => {
            const response = await citiesAPI(state)     
            setCities(response.data);
        };
        fetchData();
    },[]);
    
   return ( 
      <Formik 
        validationSchema={createAccountValidationSchema}
        enableReinitialize={true} 
        initialValues={myValues}
        onSubmit={async (values) => {
            const token = title=="Create"?"":userLoginInfo.token
            await API(values, token).then(({data}) => {
                if (data.status=="Created" ){
                    setUserLoginInfo({...userLoginInfo,isAuthorized:true, token:data.token});
                    queryCache.invalidateQueries('accountInfo');
                    navigation.navigate("MyAccountInfo");
                }  
                else if (data.status=="Updated"){
                  queryCache.invalidateQueries('accountInfo');
                  navigation.navigate("MyAccountInfo");
                }         
              }
            );     
        }}
      >
        {({ handleChange, handleBlur, handleSubmit,values,setFieldValue,errors,isValid }) => (
          <View style={styles.container}>

            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('fname')}
                onBlur={handleBlur('fname')}
                placeholder="Type here your first name"
                value={values.fname}
            />
            {errors.fname &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.fname}</Text>
            }
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('lname')}
                onBlur={handleBlur('lname')}
                placeholder="Type here your last name"
                value={values.lname}
            />
            {errors.lname &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.lname}</Text>
            }
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('eamil')}
                placeholder="Type here your eamil"

                value={values.email}
            />
            {errors.email &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                placeholder="Type here your phone"

                value={values.phone}
            />
            {errors.phone &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
            }
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                placeholder="Type here your address"

                value={values.address}
            />
            {errors.address &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
            }
            <RNPickerSelect
            useNativeAndroidPickerStyle={false}
                value={values.state}
                style={pickerStyle}
                onValueChange={(value) => {setFieldValue('state', value)}}
                onDonePress={()=>{citiesAPI(values.state).then(({data})=>{setCities(data)})}}
                items={stateHash}
            />
            {errors.state &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.state}</Text>
            }
            <RNPickerSelect
            useNativeAndroidPickerStyle={false}
                value={values.city}
                style={pickerStyle}
                onValueChange={(value) => {setFieldValue('city', value)}}
                items={cities.map(city => (
                    {
                      label: city,
                      value: city,
                    }))}
            />
            {errors.city &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.city}</Text>
            }
            { !userLoginInfo.token?
                (<>
                    <TextInput
                        style={styles.textFiled}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Type here your password"
                        value={values.password}
                    />
                    {errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}
                </>
                ):(<></>)

            }
            <Button onPress={handleSubmit} title={title}  disabled={!isValid} />
            <Button onPress={_=>{
              (title=="Update")? navigation.navigate("MyAccountInfo") : navigation.pop(1);
            }
          } title="Cancel" />
          </View>
        )}
      </Formik>
   )
 }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFiled:{
      height: 40, 
      width:180, 
      textAlign:'center',
      borderColor: 'gray', 
    }
});
const pickerStyle = {
	inputIOS: {
		color: 'Black',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
    textAlign:'center',

	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};