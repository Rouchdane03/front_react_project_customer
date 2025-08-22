import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import { loginUser as performLogin, getCustomerById} from '../../services/client';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children})=>{

   const [user, setUser] = useState(null);

   useEffect(()=>{
     let token = localStorage.getItem("access_token");
     if(token){
        token = jwtDecode(token); //à cause du let, on peut mettre une nouvelle valeur dans cet attribut
        setUser({
            username : token.sub,
            roles: token.scopes
        })
     }

   },[])

   //déclaration function
   const login= async(userNameAndPassword)=>{
     
       return await new Promise((resolve, reject)=>{

            performLogin(userNameAndPassword).then(res=>{
               const jwtToken = res.headers["authorization"];

               //save the token
                localStorage.setItem("access_token",jwtToken);

               //decodons le token pour extraire le sub et le scopes
                const tokenDecoded = jwtDecode(jwtToken);

               //set the User (quand connecté, on change automatiquement l'etat du composant AuthContext)
               setUser({
                username : tokenDecoded.sub,
                roles: tokenDecoded.scopes,
                ...res.data.customerDTO
            })
               resolve(res);

            }).catch(err=>{
                reject(err);
            })
       })
   };
   const logout = ()=> {
       localStorage.removeItem("access_token");
       setUser(null);
   };

   //voir si le user authentifié
   const checkUserAuthenticated = ()=>{
    const token = localStorage.getItem("access_token");
    if(!token){  //si y'a pas de token dans le local storage alors il est pas connecté, donc go login
        return false;
    }
    const decodedToken = jwtDecode(token);
    if(Date.now() > decodedToken.exp * 1000){ //fois mille car .now() lui est en milliseconds, 1ms -> 10°-3 sseconds donc fois 1000 poour retourner notre seconds en ms
        logout();
        return false;
    }
    return true; //dans le cas où le token existe et il n'est pas expiré.
   }


   return (
        <AuthContext.Provider value={{   //le AuthProvider retourne le AuthContext(qui ici, représente le React context de mon appli)
            user,
            setUser,
            login,
            logout,
            checkUserAuthenticated
        }}> 
          {children}   
        </AuthContext.Provider>
       //ici le children est important car on va envelopper toute notre appli par AuthProvider?, dont faut qu'on lui dise explicitemnt d'afficher les children au besoin
   );
}

export const useAuth = ()=> useContext(AuthContext); // pour exporter le hook useContext(...)

export default AuthProvider;