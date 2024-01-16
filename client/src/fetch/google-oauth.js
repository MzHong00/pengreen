import axios from 'axios';

const fetchLogin = async () => {
  const res = await axios.get('http://localhost:5001/api/account/signin');

  return res.data;
}

const fetchUser = async (code) => {
  try {
    const res = await axios.post('http://localhost:5001/api/account/userinfo', {
      code: code
    });

    return res;
  } catch (error) {
    console.error("error: ", error);
  }
}

const fetchLogout = async () => {
  try {
    await axios.get('http://localhost:5001/api/account/signout');
  } catch (error) {
    console.error("error: ", error);
  }
}

export {
  fetchLogin, fetchUser, fetchLogout
}