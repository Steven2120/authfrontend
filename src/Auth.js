const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const registerUser = async (username, password) => {
  try {
    const url = `${urlEndpoint}/auth/register-user`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseJSON = await response.json();
    return responseJSON.success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const loginUser = async (username, password) => {
  try {
    const url = `${urlEndpoint}/auth/login-user`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
      localStorage.setItem(
        process.env.REACT_APP_TOKEN_HEADER_KEY,
        JSON.stringify(responseJSON.token)
      );
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
};

export const getUserToken = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
