import axios from 'axios';

// TODO: If deployed change to calling the api subdomain

export async function signIn(user, password) {
  let data = new FormData();
  data.append('usuario', user);
  data.append('contrasena', password);
    let config = {
        method: 'post',
        url: '/login',
        data: data,
        withCredentials: true
    };
  let res = await axios(config);
  return res.data;
}

export async function getCalif() {
  var res = await axios.get('/calif',
      {
        withCredentials: true
      });
  return res.data;
}

export async function currentSession() {
  var res = await axios.get('/session',
      {
        withCredentials: true
      });
  return res.status;
}

export async function signOut() {
  var res = await axios.get('/signout');
  return res.data;
}