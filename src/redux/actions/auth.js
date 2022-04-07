import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../helpers/getConfig";
import { types } from "../types/types";



const baseURL =  process.env.REACT_APP_API_URL;


export const startLogin = ( email, password ) =>{
    return (dispatch) => {
        axios.post(`${baseURL}/auth/login`, {email, password} )
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: res.data.uid,
                    name: res.data.name
                }))
            })
            .catch(error => {
                console.log(error.response.data)
                Swal.fire('Error', error.response.data.msg)
            });
    }
}

export const startRegister = (name, email, password) =>{
    console.log(name, email, password)
    return ( dispatch ) =>{
        axios.post(`${baseURL}/auth/register`, {name ,email, password} )
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: res.data.uid,
                    name: res.data.name
                }))
            }).catch(error => {
                console.log(error.response.data)
                Swal.fire('Error', error.response.data.msg)
            });
    }
}

export const startChecking = () =>{
    return (dispatch) =>{
        axios.get(`${baseURL}/auth/renew`, getConfig())
            .then(res => {
                console.log('ENTRA?')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: res.data.uid,
                    name: res.data.name
                }))
            }).catch(error => {
                console.log(error)
                dispatch( checkingFinish() );
            });
    }
}

const checkingFinish = () =>({type: types.authCheckingFinish });

const login = ( user ) =>({
    type: types.authLogin,
    payload: user
})