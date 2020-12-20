const alphabet = 'QWERTZUIOPLKJHGFDSAYXCVBNM1234567890';
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export const generateId = (n) =>
  n > 0 ? pick(alphabet) + generateId(n - 1) : '';

export const getSecretCookie = () => {
  if (!window.localStorage) return 'NO_LOCAL_STORAGE';
  var cookie = window.localStorage.getItem('eleusisSecretCookie');
  if (!cookie) {
    cookie = generateId(16);
    window.localStorage.setItem('eleusisSecretCookie', cookie);
  }
  return cookie;
};

export const getDataPreference = () => {
  if (!window.localStorage) return 'RETRACTED';
  var preference = window.localStorage.getItem('eleusisDataPreference');
  if (!preference) {
    preference = 'OK';
    window.localStorage.setItem('eleusisDataPreference', preference);
  }
  return preference;
};
