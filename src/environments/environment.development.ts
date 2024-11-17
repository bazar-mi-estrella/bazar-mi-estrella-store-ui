//const HOST="https://cix-tech-mart-api.onrender.com";
const HOST = "http://localhost:8081";

export const environment = {
  API:HOST+"/cix-tech-mart-api/v1",
  production: true,
  defaultauth: 'fakebackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};