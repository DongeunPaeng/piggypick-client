import { firebase, googleAuthProvider } from "../firebase/firebase";
import axios from "axios";

export const login = (uid, email) => ({
  type: "LOGIN",
  uid,
  email
});

export const startLogin = () => {
  return () => {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        const {
          user: { uid, email }
        } = result;
        axios({
          method: "post",
          url: "api/users",
          data: {
            uid,
            email
          }
        }).then(res => {
          if (res.status === 200) {
            console.log('Welcome!')
          }
        });
      });
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
