import React, { createContext, useState } from 'react';

// Create a context
export const ConfigContext = createContext();

// Create a provider component
export const ConfigProvider = ({ children }) => {
  const [auctionno, setAuctionNo] = useState(null);
  const [auctionmodel, setAuctionModel] = useState(null);
  const [auctionprice, setAuctionPrice] = useState(null);
  const [auctionPerTime, setAuctionPerTime] = useState(null);

  return (
    <ConfigContext.Provider value={{ auctionno, setAuctionNo, auctionmodel, setAuctionModel, auctionprice, setAuctionPrice, auctionPerTime, setAuctionPerTime }}>
      {children}
    </ConfigContext.Provider>
  );
};
