import { useState, useContext, createContext } from "react";

const conContext = createContext();

const useContent = () => {
  return useContext(conContext);
};

// eslint-disable-next-line react/prop-types
const ContProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState();
  return (
    <conContext.Provider value={{ data, setData, filter, setFilter }}>
      {children}
    </conContext.Provider>
  );
};

export { useContent };
export default ContProvider;
