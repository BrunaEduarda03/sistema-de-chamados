import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private ({children}){
  const {signed,loading} = useContext(AuthContext);
  if(loading) return <h1>Carregando...</h1>
  if(!signed) return <Navigate to='/' />
  
  //console.log(signed);
  return children;
}
