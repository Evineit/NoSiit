import axios from 'axios';

export async function signIn(user, password) {
  let data = new FormData();
  data.append('usuario', user);
  data.append('contrasena', password);
    let config = {
        method: 'post',
        url: 'https://api.nosiit.live/login',
        data: data,
        withCredentials: true
    };
  let res = await axios(config);
  return res.data;
}

export async function getCalif() {
  var res = await axios.get('https://api.nosiit.live/calif',
      {
        withCredentials: true
      });
  return res.data;
}

export async function getKardex() {
  const response = await axios.get('https://api.nosiit.live/kardex',
    {
      withCredentials:true
    });
  return response.data
}

export async function currentSession() {
  var res = await axios.get('https://api.nosiit.live/session',
      {
        withCredentials: true
      });
  return res.status;
}

export async function signOut() {
  var res = await axios.get('https://api.nosiit.live/signout');
  return res.data;
}