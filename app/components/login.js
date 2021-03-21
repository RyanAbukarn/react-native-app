import React , {useContext,useState} from 'react';
import { StyleSheet, View, Text,TextInput, Button } from 'react-native';
import axios from 'axios'
import {UserLoginInfo} from '../context/userLoginInfo'
import { Formik } from 'formik';
import {loginValidationSchema} from '../sheared/inputValidation'
const LoginAPI = (userCredentials) => {
    return axios
      .post("http://localhost:3000/api/v1/authenticate",{
        email: userCredentials.email,
        password: userCredentials.password
        })

}


const Login = ({navigation}) => {

    const {userLoginInfo, setUserLoginInfo} = useContext(UserLoginInfo);
    const [login,setLogin] = useState(false);
    return (
    <Formik 
    validationSchema={loginValidationSchema}
    enableReinitialize={true} 
    initialValues={{email:'', password:''}}
    onSubmit={async (values) => {
      LoginAPI(values).then(({data})=>{ 
        if (data.statues){
          setUserLoginInfo({...userLoginInfo,isAuthorized:true, token:data.token})
        }
        else{
          setLogin(true);
        }
    })   
    }}
  >{({handleChange,handleSubmit,values,handleBlur,errors,isValid}) =>(

      <View style={styles.container}>
            {login &&
              <Text style={{ fontSize: 10, color: 'red' }}>Wrong password/email</Text>}
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Type here your email"
                value={values.email}
            />
            {errors.email &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <TextInput
                style={styles.textFiled}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Type here your password"
                value={values.password}
            />
            {errors.password &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <Button style={styles.button} title="Login" disabled={!isValid} onPress={handleSubmit}/>
            <Button title="Create A new account" onPress={_=>{navigation.push("CreateAccount")}}/>

      </View>)}
      </Formik>
    );
}

export default Login;

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
      borderColor: 'gray',
      textAlign:'center',
 
    },
});

