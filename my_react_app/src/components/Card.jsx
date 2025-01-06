import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import DeleteCustomerDialog from './DeleteCustomerDialog';
import UpdateCustomer from './UpdateCustomer';

export default function CardWithImage({id, name, email, password, age, gender,fetchCustomers}) {

  const genderVal = gender==="MALE"? "men":"women";
  const updateValue = {
                        name: name,
                        email:email,
                        age:age,
                        password:password,
                        gender:gender
                      };
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              `https://randomuser.me/api/portraits/${genderVal}/${id}.jpg`
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={2} align={'center'} mb={5}>
          <Tag borderRadius={"full"} variant='solid' colorScheme='blue' size={"md"}>{id}</Tag>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
             {name}
            </Heading>
            <Text color={'gray.500'}>{email}</Text>
            <Text color={'gray.500'}>Age {age} | {gender}</Text>
            <Wrap justify={"center"} spacing={"10px"}>
                <WrapItem>
                     <DeleteCustomerDialog passTheId={id} customerName={name} fetchCustomers = {fetchCustomers}/>
                </WrapItem> 
                <WrapItem>
                     <UpdateCustomer passTheId={id} fetchCustomers={fetchCustomers} updateValue={updateValue}/>
                </WrapItem>    
            </Wrap>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}