import { useState } from "react";
import Input from "../primitive/Input";
import MultiSelectDropdown from "./MultipleDropDown";

export default function QuoteForm({save,detail,hotels,aerolines,onChangeAerolines,onChangeHotels}) {

    const onChangeInput = (e,attribute) => {
        const valueToChange = e.target.value
        save(prevValue => ({...prevValue,[attribute]:valueToChange}))
    }

    const onChangeInputNumber=(e,attribute)=>{
        const valueToChange = e.target.value

        save(prevValue => ({...prevValue,[attribute]:parseInt(valueToChange) }))
    }

    const onFocus=(e,attribute)=>{
        console.log('onFocus')
        const valueToChange = e.target.value
        console.log(valueToChange)
        if(valueToChange==0)
            save(prevValue => ({...prevValue,[attribute]:''  }))
    }


    const onFocusOut=(e,attribute)=>{
        console.log("On focus out")
        const valueToChange = e.target.value
        console.log(valueToChange)
        if(valueToChange=='')
            save(prevValue => ({...prevValue,[attribute]:0  }))
    }

    return (
        <div className="grid grid-cols-4 border-2 bg-white shadow-lg gap-4 p-4">
            <Input title="# Adultos" onBlur={e => {onFocusOut(e,'adults')}} onFocus={e => { onFocus(e,'adults') }} min={1} value={detail.adults} onChange={e => { onChangeInputNumber(e,'adults') }} defaultValue={1} type={'number'} />
            <Input title="# Niños " onBlur={e => {onFocusOut(e,'kids')}} onFocus={e => { onFocus(e,'kids') }}  min={0} value={detail.kids} onChange={e => { onChangeInputNumber(e,'kids') }} defaultValue={0} type={'number'} />
            <Input title="Fecha de inicio"  type="date" value={detail.startDate} onChange={e => { onChangeInput(e,'startDate') }}/>
            <Input title="# días" onBlur={e => {onFocusOut(e,'days')}} onFocus={e => { onFocus(e,'days') }} type="number" min={1} value={detail.days} defaultValue={1} onChange={e => { onChangeInputNumber(e,'days') }}/>
            <Input title="fee Adulto" onBlur={e => {onFocusOut(e,'adultFee')}} onFocus={e => { onFocus(e,'adultFee') }} type="number" min={100} value={detail.adultFee} defaultValue={100} onChange={e => { onChangeInputNumber(e,'adultFee') }}/>
            <Input title="fee Niño" onBlur={e => {onFocusOut(e,'kidFee')}} onFocus={e => { onFocus(e,'kidFee') }} type="number" min={100} value={detail.kidFee} defaultValue={100} onChange={e => { onChangeInputNumber(e,'kidFee') }}/>
            <Input title="Traslado" onBlur={e => {onFocusOut(e,'traslado')}} onFocus={e => { onFocus(e,'traslado') }} type="number" min={0} value={detail.traslado} defaultValue={25} onChange={e => { onChangeInputNumber(e,'traslado') }}/>
            <Input title="Isla Saona" onBlur={e => {onFocusOut(e,'islaSaona')}} onFocus={e => { onFocus(e,'islaSaona') }} type="number" min={0} value={detail.islaSaona} defaultValue={80} onChange={e => { onChangeInputNumber(e,'islaSaona') }}/>
            <div className="col-span-2 bg-red-200">
                <MultiSelectDropdown 
                    formFieldName={"Aerolineas"} 
                    prompt="Selecciona las aerolineas" 
                    options={aerolines} 
                    onChange={e => {onChangeAerolines(e)}}
                />
            </div>
            <div className="col-span-2 bg-blue-200">
                <MultiSelectDropdown 
                    prompt="Selecciona los hoteles" 
                    options={hotels} 
                    onChange={e => {onChangeHotels(e)}}/>
            </div>
        </div>)


}

