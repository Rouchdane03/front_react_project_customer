import { Formik, Form, useField } from 'formik';
import {Alert, AlertIcon, FormLabel, Input, Box, Button, Stack} from "@chakra-ui/react";
import * as Yup from 'yup';
import { useAuth } from './context/AuthProvider';
import { errorNotification, successNotification } from '../services/notification';
import { useNavigate } from "react-router";



const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
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
};


const CreateLoginForm = ()=>{
    const {login} = useAuth();
    const navigate = useNavigate();
    return (
        <>
        <Formik
                validationOnMount = {true}

                initialValues={{
                  username: '',
                  password:'',
                 
                }}

                validationSchema={Yup.object({
                  username: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  password: Yup.string()
                  .max(50, 'Must be 20 characters or less')
                  .required('Required')
                })}

                onSubmit={(value, {setSubmitting}) => {
                 setSubmitting(true); //quand il clique sur le bouton pour soumettre le formulaire, il désactive le bouton
                  login(value).then(res=>{
                    //navigate to the dashboard
                        navigate("/dashboard");
                        successNotification("Customer saved",`"${value.username}" has been sucessfully authenticated`);
                        console.log(res);
                        //fetchCustomers();
                    })
                    .catch(err=>{
                    //catch the error and send a notification
                        console.log(err);
                        errorNotification(err.code, err.response.data.message);
                    })
                    .finally(()=>{
                        setSubmitting(false); //quand il a finit de soumettre le formulaire, il réactive le bouton
                    });
                 }
                }
              >
                        {({isValid, isSubmitting})=> (
                          <Form>
                          <Stack spacing={18}>
                          <MyTextInput
                            label="Email"
                            name="username"
                            type="email"
                            placeholder="rouchdane@gmail.com"
                          />
                
                         <MyTextInput
                            label="Password"
                            name="password"
                            type="text"
                             placeholder="pwd" 
                          />
                
                          <Button type="submit" colorScheme='blue' isDisabled={!isValid || isSubmitting} >Submit</Button>
                          </Stack>
                        </Form>
                       )
                        }
              </Formik>
        </>
);
};

export default CreateLoginForm;