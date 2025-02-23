import { UserLogin } from "../interfaces/UserLogin.js";

const login = async (userInfo: UserLogin) => {
  
  // Make a POST request to the login route
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });

  const user = await res.json();
  return user;
}



export { login };