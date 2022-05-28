import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nosiit-api.herokuapp.com/',
  // Temporarily down siit, so small timeout for lower response times
  timeout: 10000,
  withCredentials: true,
});

export async function signIn(user, password) {
  let data = new FormData();
  data.append('usuario', user);
  data.append('contrasena', password);
    let config = {
        method: 'post',
        url: 'login',
        data: data,
        
    };
  let res = await instance(config);
  return res.data;
}

export async function getCalif() {
  var res = await instance.get('calif');
  return res.data;
}

export async function getKardex() {
  const response = await instance.get('kardex');
  return response.data
}

export async function getAvanceRet() {
  const response = await instance.get('avance_reticular');
  return response.data
}

export async function getGruposCargados() {
  const response = await instance.get('grupos_cargados');
  return response.data
}

export async function getHorario() {
  const response = await instance.get('horario');
  return response.data
}

export async function currentSession() {
  var res = await instance.get('session');
  return res.status;
}

export async function signOut() {
  var res = await instance.get('signout');
  return res.data;
}