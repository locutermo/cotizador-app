'use client'
import { useEffect, useState } from "react";
import QuoteForm from "../commons/QuoteForm";
import TablePrice from "../commons/TablePrice";
import { AEROLINES, HOTELS} from "../../util/constants";

import { useApp } from "../../contexts/AppContext";
export default function CotizationSection() {
    const {cotizationDetail,setCotizationDetail,aerolinePrices,setAerolinePrices,hotelPrices,setHotelPrices} = useApp()
    

    const onUpdateOptions = (option, dispatch) => {

        dispatch(prevValue => prevValue.map(prevOptionPrice => {
            if (prevOptionPrice.name === option.name) return option
            return prevOptionPrice
        }))
    }


    useEffect(() => {

    }, [cotizationDetail])

    const onChangeSelector=(newArray,name)=>{


        if(name=="aeroline"){
            const setSelected = new Set(newArray);
            const setPrevious = new Set(aerolinePrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newAerolines = aerolinePrices.filter(aeroline => [...intersection].find(e => e ==aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if([...difference].length > 0){
                newAerolines.push(...[...difference].map(e => ({name: e})))
            }

            setAerolinePrices(newAerolines)
        }
        if(name=="hotel"){
            const setSelected = new Set(newArray);
            const setPrevious = new Set(hotelPrices.map(e => e.name))

            const intersection = new Set([...setSelected].filter(x => setPrevious.has(x)))
            let newHotels = hotelPrices.filter(aeroline => [...intersection].find(e => e ==aeroline.name))


            const difference = new Set([...setSelected].filter(x => !setPrevious.has(x)))
            if([...difference].length > 0){
                newHotels.push(...[...difference].map(e => ({name: e})))
            }

            setHotelPrices(newHotels)
        }
    }

    return (
        <div className="p-2 flex flex-col gap-2">
                <QuoteForm 
                    detail={cotizationDetail} 
                    aerolines={AEROLINES.map(e => e.name)}
                    hotels={HOTELS.map(e => e.name)}
                    onChangeAerolines={e => {onChangeSelector(e,'aeroline')}} 
                    onChangeHotels={e => {onChangeSelector(e,'hotel')}} 
                    save={setCotizationDetail} 
                />
                <TablePrice options={aerolinePrices} detail={cotizationDetail} type="aeroline" onUpdateOptions={option => { onUpdateOptions(option, setAerolinePrices) }} />
                <TablePrice options={hotelPrices} detail={cotizationDetail} type="hotel" onUpdateOptions={option => { onUpdateOptions(option, setHotelPrices) }} />
        </div>
    )
}