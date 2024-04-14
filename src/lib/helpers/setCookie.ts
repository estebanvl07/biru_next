export const setCookie = (name: string, value: any) => {
  const cookie = `${name}=${value}; path=/`;
  document.cookie = cookie;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null; // Devuelve null si la cookie no se encuentra
};
