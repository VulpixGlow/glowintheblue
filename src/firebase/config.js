import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBGRvV75HU12VKFDMLxfNEQDsjpGvJ1AtU',
  authDomain: 'glow-in-the-blue.firebaseapp.com',
  databaseURL: 'https://glow-in-the-blue-default-rtdb.firebaseio.com/',
  projectId: 'glow-in-the-blue',
  storageBucket: 'glow-in-the-blue.appspot.com',
  messagingSenderId: '260546321012',
  appId: '1:260546321012:ios:411a3f1bbb027f36a58f21',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
