import {Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import SidebarWithHeader from "./components/shared/SideBar";
import { useEffect, useState } from 'react';
import { getCustomers } from './services/client';
import CardWithImage from './components/Card';

const App = ()=>{

    const [customers, setCustomers] = useState([]); //lui il renvoie un tableau de deux valeurs: une val initial à une variable et un callback qui retourne la nouvelle valeur ou modifié de la variable initial
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
      setLoading(true);
     getCustomers().then(res=>{
         setCustomers(res.data)
     }).catch(err=>{
      console.log(err)}
    ).finally(()=>{
      setLoading(false)
    });
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
               <Text>No customers available</Text>
            </SidebarWithHeader>
            );
    }
  return (
  <SidebarWithHeader>
    <Wrap justify={"center"} spacing={"30px"}>
        {customers.map((customer,index)=>(
            <WrapItem key={index}>
              <CardWithImage {...customer}/>
            </WrapItem> 
        ))}
     </Wrap>
  </SidebarWithHeader>
  );
}
export default App;