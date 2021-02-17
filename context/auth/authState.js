
import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';


import { 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

// @ts-ignore
import clienteAxios from '../../config/axios';
// @ts-ignore
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: null
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // @ts-ignore
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            // @ts-ignore
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            // @ts-ignore
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    // Autenticar Usuarios
    const iniciarSesion = async datos => {

        try {
           // const respuesta = await clienteAxios.post('/api/auth', datos); se descomenta cuando este el backend
            // @ts-ignore
            dispatch({
                type: LOGIN_EXITOSO,
                payload: true
            })
        } catch (error) {
            // @ts-ignore
            dispatch({
                type: LOGIN_ERROR,
                payload: true
            })
        }

        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            // @ts-ignore
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    // Retorne el Usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario) {
                // @ts-ignore
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                }) 
            }

        } catch (error) {
            // @ts-ignore
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Cerrar la sesión
    const cerrarSesion = () => {
        // @ts-ignore
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{ 
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado, 
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;