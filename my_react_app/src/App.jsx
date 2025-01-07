import {Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import SidebarWithHeader from "./components/shared/SideBar";
import { useEffect, useState } from 'react';
import { getCustomers } from './services/client';
import CardWithImage from './components/Card';
import DrawerForm from './components/DrawerForm';
import { errorNotification } from './services/notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/context/AuthProvider';

const App = ()=>{

    const [customers, setCustomers] = useState([]); //lui il renvoie un tableau de deux valeurs: une val initial à une variable et un callback qui retourne la nouvelle valeur ou modifié de la variable initial
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {user} = useAuth();
    const navigate = useNavigate();

    //here c'est juste la declaration, il fait rien si on l'appelle pas.
    const fetchCustomers = ()=>{
      setLoading(true);
     getCustomers().then(res=>{
         setCustomers(res.data);
     }).catch(err=>{
      setError(err?.message);
      errorNotification(err?.code, err?.message);
    }
    ).finally(()=>{
      setLoading(false)
    });
    };

    useEffect(()=>{
      fetchCustomers();
    },[]);

    if(loading){
      return(
         <SidebarWithHeader>
            <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
            />
          </SidebarWithHeader>
      );
      
    }
    
    if(customers.length<=0){
      return (
            <SidebarWithHeader>
               <DrawerForm
               fetchCustomers = {fetchCustomers}
               />
               <Text mt={5}>No customers available</Text>
            </SidebarWithHeader>
            );
    }

    if(error){
      return (
        <SidebarWithHeader>
           <DrawerForm
           fetchCustomers = {fetchCustomers}
           />
           <Text mt={5}>Oooops there is an error</Text>
        </SidebarWithHeader>
        );
    }

  return (
  <SidebarWithHeader>
    <DrawerForm
    fetchCustomers = {fetchCustomers}
    />
    <Wrap justify={"center"} spacing={"30px"}>
        {customers
        .sort((c1,c2)=>c1.id-c2.id)
        .map((customer,index)=>(
            <WrapItem key={index}>
              <CardWithImage {...customer} fetchCustomers = {fetchCustomers}/>
            </WrapItem> 
        ))}
     </Wrap>
  </SidebarWithHeader>
  );
}
export default App;