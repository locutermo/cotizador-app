import { createContext, useState,useContext } from 'react';
import { AEROLINES, HOTELS, ISLA_SAONA, TRASLADO_PRICE } from '../util/constants';

export const AppContext = createContext(null);

export function AppProvider({children}) {
    const [cotizationDetail, setCotizationDetail] = useState({ adults: 1, days: 1, kids: 0, adultFee: 100, kidFee: 100, traslado: TRASLADO_PRICE,islaSaona:ISLA_SAONA });
    const [aerolinePrices, setAerolinePrices] = useState(AEROLINES)
    const [hotelPrices, setHotelPrices] = useState(HOTELS)

  return (
    <AppContext.Provider value={{
        cotizationDetail,setCotizationDetail,
        aerolinePrices,setAerolinePrices,
        hotelPrices,setHotelPrices
      }}>
      {children}
    </AppContext.Provider>
  );
}


export function useApp(){
    return useContext(AppContext);
}