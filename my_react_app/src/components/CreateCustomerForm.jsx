import { Formik, Form, useField } from 'formik';
import {Alert, AlertIcon, FormLabel, Input, Select, Box, Button, Stack} from "@chakra-ui/react";
import { registerCustomer, updateCustomer } from '../services/client';
import { successNotification, errorNotification } from '../services/notification';
import * as Yup from 'yup';


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  if(!props.isUpdating){
    const [field, meta] = useField(props);
    return (
      <Box>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <Alert className="error" status={"error"} mt={2}>
            <AlertIcon/>
            {meta.error}
          </Alert>
        ) : null}
      </Box>
    );
  }
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon/>
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
const CreateCustomerForm = ({fetchCustomers,updateValue,passTheId}) => {
  return (
    <>
      <Formik
        initialValues={{
          name: updateValue?updateValue.name:'',
          email:updateValue?updateValue.email:'',
          password:'', //y'a pas de password dans le DTO(car c'est un ou des DTOs le get renvoie)
          age: updateValue?updateValue.age:'',
          gender: updateValue?updateValue.gender:''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(40, 'Must be 40 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(1,'Must be at least 1 character')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          age: Yup.number()
            .min(16,'Must be at least 16 year Old')
            .max(100,'Must be less than 100 years of age')
            .required('Required'),
          gender: Yup.string()
            .oneOf(
              ['MALE', 'FEMALE'],
              'Invalid gender'
            )
            .required('Required'),
        })}
        onSubmit={(customer, {setSubmitting}) => {
          setSubmitting(true);
          if(!updateValue){
                  registerCustomer(customer)
                  .then(res=>{
                    console.log(res);
                    successNotification("Customer saved",`"${customer.name}" has been sucessfully added`);
                    fetchCustomers();
                  })
                  .catch(err=>{
                    console.log(err);
                    errorNotification(err.code, err.response.data.message);
                  })
                  .finally(()=>{
                    setSubmitting(false);
                  });
          }
          else{
            updateCustomer(customer,passTheId)
                  .then(res=>{
                    console.log(res);
                    successNotification("Customer updated",`"${customer.name}" has been sucessfully  updated`);
                    fetchCustomers();
                  })
                  .catch(err=>{
                    console.log(err);
                    errorNotification(err.code, err.response.data.message);
                  })
                  .finally(()=>{
                    setSubmitting(false);
                  });
          }
          
        }}
      >
        {({isValid, isSubmitting})=> (
          <Form>
          <Stack spacing={18}>
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            //placeholder="Jane"
          />

         <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            //placeholder="jane@formik.com"
          />
          
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            isUpdating={updateValue}
            //placeholder="pwd" 
          />
           
          <MyTextInput
            label="Age"
            name="age"
            type="number"
            //placeholder="20"
          />
         
          <MySelect label="Gender" name="gender">
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </MySelect>

          <Button type="submit" colorScheme='blue' isDisabled={!isValid || isSubmitting} >Submit</Button>
          </Stack>
        </Form>
       )
        }
      </Formik>
    </>
  );
};

export default CreateCustomerForm;