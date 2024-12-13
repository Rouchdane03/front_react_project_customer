import axios from "axios";

export const getCustomers = async()=>{
    try{
      return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customer`);
    }catch(err){
      throw err;
       }
}

export const registerCustomer = async(aCustomer)=>{
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/create`,
             aCustomer
             );
      }catch(err){
        throw err;
         }
}

export const deleteCustomer = async(customerId)=>{
    try{
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/${customerId}`
             );
      }catch(err){
        throw err;
         }
}

export const updateCustomer = async(aNewCustomer,customerId)=>{
  try{
      return await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/${customerId}`,
          aNewCustomer
           );
    }catch(err){
      throw err;
       }
}





