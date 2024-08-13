import React, { createContext, useState } from 'react';

// Create a context
export const ConfigContext = createContext();

// Create a provider component
export const ConfigProvider = ({ children }) => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);

  return (
    <ConfigContext.Provider value={{ value1, setValue1, value2, setValue2, value3, setValue3, value4, setValue4 }}>
      {children}
    </ConfigContext.Provider>
  );
};
