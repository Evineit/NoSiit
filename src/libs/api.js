import axios from 'axios'

// TODO: If deployed change to calling the api subdomain

export async function signIn(user, password) {
  await axios.get('http://127.0.0.1:5000/start')
  let data = new FormData();
  data.append('usuario', user);
  data.append('contrasena', password);
  let config = {
    method: 'post',
    url: 'http://127.0.0.1:5000/login',
    data: data
  };
  let res = await axios(config);
  return res.data;
}

export async function getCalif() {
  var res = await axios.get('http://127.0.0.1:5000/calif')
  return res.data;
}

export async function currentSession() {
  var res = await axios.get('http://127.0.0.1:5000/session')
  return res.status
}

export async function signOut() {
  var res = await axios.get('http://127.0.0.1:5000/signout')
  return res.data;
}