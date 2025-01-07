import axios from "axios";


const getAuthConfig = ()=>({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
})

export const getCustomers = async()=>{
    try{
      return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customer`,
        getAuthConfig()
      );
    }catch(err){
      throw err;
       }
}

export const getCustomerById = async(idCustomer)=>{
  try{
      return await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/${idCustomer}`,
          getAuthConfig()
           );
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
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/${customerId}`,
            getAuthConfig()
             );
      }catch(err){
        throw err;
         }
}

export const updateCustomer = async(aNewCustomer,customerId)=>{
  try{
      return await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/customer/${customerId}`,
          aNewCustomer,
          getAuthConfig()
           );
    }catch(err){
      throw err;
       }
}

export const loginUser = async(userNameAndPassword)=>{
  try{
      return await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
          userNameAndPassword
           );
    }catch(err){
      throw err;
       }
}





