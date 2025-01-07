import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import CreateCustomerForm from './CreateCustomerForm';
import { useAuth } from './context/AuthProvider';



const NewCustomer=  ()=> {
  const {logout} = useAuth();
   logout();
  const navigate = useNavigate();
  const isNewAccount = true;
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>Please fill in everything.</Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          width="400px"
          >
          <Stack spacing={4}>
            <CreateCustomerForm isNewAccount={isNewAccount}></CreateCustomerForm>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={()=>{navigate("/")}}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default NewCustomer;