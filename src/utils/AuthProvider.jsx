// eslint-disable-next-line no-unused-vars
import React from "react";
import { useContext, createContext, useState } from "react";
const AuthContext = createContext({});

const useAuth = () => {
  return useContext(AuthContext);
};
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [usr, setUsr] = useState("");
  const [userdata, setUserdata] = useState();
  return (
    <AuthContext.Provider value={{ usr, setUsr, userdata, setUserdata }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
export default AuthProvider;
