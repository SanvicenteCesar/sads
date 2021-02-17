import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import authContext from '../context/auth/authContext';
import Link from 'next/link';


const Index = () => {

  // Extraer el Usuario autenticado del Storage 
  const AuthContext = useContext( authContext );
  const { usuarioAutenticado } = AuthContext;


  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      usuarioAutenticado()
    }
   
  }, []);

  return ( 
      <h1>Hola</h1>
   );
}
 
export default Index;