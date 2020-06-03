var jwtDecode = require('jwt-decode');

export const authCheck = () => {
  if (localStorage.getItem('userData')) {
    const userData = localStorage.getItem('userData')
    return jwtDecode(userData)
  } else { return '' }
}

export const getCurrentUserId = () => {
  const decoded = authCheck();
  // if (decoded.userId) {
  if (decoded) {
    return decoded.userId
  }
}