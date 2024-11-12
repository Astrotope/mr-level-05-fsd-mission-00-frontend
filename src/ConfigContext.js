import React, { createContext, useContext } from 'react';

// Create the context
const ConfigContext = createContext();

// Create a provider component
const ConfigProvider = ({ children }) => {
  const apiUrl = 'https://mr-level-05-fsd-mission-00-backend-e8djd6bgese7crg8.australiaeast-01.azurewebsites.net'; // or hard-code your API URL

  if (apiUrl) {
    console.info({apiUrl});
  }

  return (
    <ConfigContext.Provider value={{ apiUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Custom hook to use the Config context
const useConfig = () => useContext(ConfigContext);

// Export `ConfigProvider` as default and `useConfig` as a named export
export default ConfigProvider;
export { useConfig };
