import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const createAccountValidationSchema = Yup.object().shape({
    fname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'Must be exactly 10 digits').required('Required'),
    address: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
    state:Yup.string().required('Required'),
    city: Yup.string().required('Required'),
  });
  

const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
});
  
export  {loginValidationSchema, createAccountValidationSchema};
