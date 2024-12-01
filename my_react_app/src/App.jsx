import UserProfile from "./UserProfile";
import { useState, useEffect } from "react";


const users = [
        {
          name: "Jamila",
          age: 22,
          gender: "female"
        },
        {
          name: "Joe",
          age: 21,
          gender: "female"
      },
      {
        name: "isaac",
        age: 17,
        gender: "male"
    },
    {
      name: "phil",
      age: 49,
      gender: "male"
  },
  {
    name: "foden",
    age: 16,
    gender: "female"
  }
];

const UserProfiles = ({users})=>(
  <div>
         {users.map((user,index)=>(
             <UserProfile
            key={index}
               name={user.name}
               age={user.age}
               gender={user.gender}
               randomImageNumber={index}
            />
         ))}
    </div>
)
;

function App() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false)
    },4000);
      //alert("Hello");
  }, []);

  if(isLoading){
    return "loading...";
  }
  
  return(
  <div>
    <button 
      onClick={()=>setCounter(previousCounter=>previousCounter + 1)}>
      Increment counter
      </button>
    <h1>{counter}</h1>
    <UserProfiles users={users}/> 
  </div>
) ;
}
export default App;
