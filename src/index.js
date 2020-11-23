import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCeJq7TQkMCBsrzjQigA8OscV-FhTszanc',
  authDomain: 'eleusis-2.firebaseapp.com',
  databaseURL: 'https://eleusis-2.firebaseio.com',
  projectId: 'eleusis-2',
  storageBucket: 'eleusis-2.appspot.com',
  messagingSenderId: '830734164895',
  appId: '1:830734164895:web:ba9ba1a05e3af05edd93aa',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
