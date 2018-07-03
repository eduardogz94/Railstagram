import history from '../Extra/history';

export default class Auth {

  setSession(logged) {
    localStorage.setItem('username', username);
    localStorage.setItem('id',  id);
    // navigate to the home route
    history.replace('/home');
  }

  getUsername() {
    const username = localStorage.getItem('username');
    if (!username) {
      throw new Error('No access token found');
    }
    return username;
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    // navigate to the home route
    history.replace('/home');
  }
  
}
