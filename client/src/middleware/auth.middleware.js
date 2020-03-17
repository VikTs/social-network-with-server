var jwtDecode = require('jwt-decode');

export const authCheck = () => {
  if (localStorage.getItem('userData')) {
    let userData = localStorage.getItem('userData')
    return jwtDecode(userData)
  } else { return null }
}

export const getCurrentUserId = () => {
  const decoded = authCheck();
  if (decoded.userId) {
    return decoded.userId
  }
}