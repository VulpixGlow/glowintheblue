import React, { useEffect, useState } from 'react';
import { firebase } from './config/Firebase';
import App from './App';

export const Context = React.createContext();

export default function ContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  console.log('user in Context -->', user);
  console.log('CONTEXT in Context -->', Context);
  console.log('CONTEXTPROVIDER in Context -->', ContextProvider);

  return (
    <Context.Provider value={{ user: [user, setUser], loading: [loading, setLoading] }}>
      {props.children}
    </Context.Provider>
    // <Context.Provider value='Hello PLEASE'>
    //   <App />
    // </Context.Provider>
  );
}
