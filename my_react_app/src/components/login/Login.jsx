import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  Center
} from '@chakra-ui/react'
import CreateLoginForm from '../CreateLoginForm';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from "react-router";

const Login = ()=>  {
  
 const {logout} = useAuth();
 logout();
 /*
  const {user} = useAuth();
  const navigate = useNavigate();
  
  useEffect(()=>{  //comme ceci je le force à utiliser sign out pour se deconnecter
    if(user){
      navigate("/dashboard");
    }
  },[]);
*/
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Image
              src={"/rouch-management-logo.png"}
              boxSize={"200px"}
              alt={"Logo Rouch Management"}
              style={{ borderRadius: '50%', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', margin: '0 auto', display: 'block',
                position: 'relative', 
                bottom: '10px', }} 
          />
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <CreateLoginForm/>
        </Stack>
      </Flex>
      <Flex flex={1} p={10} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} bgGradient={{sm:'linear(to-r,blue.600, purple.600)'}}>
        <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
            <Link href={"https://github.com/Rouchdane03"} target={"_blank"}>
              Customer App
            </Link>
        </Text>
        <Image
          alt={'Login Image'}
          objectFit={'scale-down'}
          src={
            'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png'
          }
        />
      </Flex>
    </Stack>
)};

export default Login;