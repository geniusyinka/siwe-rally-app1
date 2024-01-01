import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
  } from 'react';
  
  interface DataContextProps {
    message: string;
    updateMessage: (newMessage: string) => void;
    data: string;
    updateData: (newData: string) => void;
  }
  
  const initialContext: DataContextProps = {
    message: '',
    updateMessage: () => {},
    data: '',
    updateData: () => {},
  };
  
  const DataContext = createContext<DataContextProps>(initialContext);
  
  export const useDataContext = () => useContext(DataContext);
  
  export const DataProvider: React.FC = ({ children }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState('');
    
  
    const updateMessage = useCallback((newMessage: string) => {
      setMessage(newMessage);
    }, []);
  
    const updateData = useCallback((newData: string) => {
      setData(newData);
    }, []);
  
    const contextValue = useMemo(
      () => ({
        message,
        updateMessage,
        data,
        updateData,
      }),
      [message, data, updateMessage, updateData]
    );
  
    return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    );
  };
  