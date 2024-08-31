import { useState } from "react";
import Input from "../primitive/Input";
import MultiSelectDropdown from "./MultipleDropDown";

export default function QuoteForm({ updateOnAttribute, detail, hotels, aerolines, onChangeAerolines, onChangeHotels }) {

    const onChangeInput = (e, attribute) => {
        const value = e.target.value
        updateOnAttribute({ attribute, value })
    }

    const onChangeInputNumber = (e, attribute) => {
        const value = e.target.value
        updateOnAttribute({ attribute, value: parseInt(value) })
    }

    const onFocus = (e, attribute) => {
        const value = e.target.value
        if (value == 0) updateOnAttribute({ attribute, value: '' })
    }


    const onFocusOut = (e, attribute) => {
        const value = e.target.value
        if (value == '')
            updateOnAttribute({ attribute, value: 0 })
    }

    return (
        <div className="grid grid-cols-4 border-2 bg-white shadow-lg dark:bg-white gap-4 p-4">
            <div className="col-span-2">
                <Input title="Nombres y Apellidos" />
            </div>
            <Input title="Fecha de inicio" type="date" value={detail.startDate} onChange={e => { onChangeInput(e, 'startDate') }} />
            <Input title="# días" onBlur={e => { onFocusOut(e, 'days') }} onFocus={e => { onFocus(e, 'days') }} type="number" min={1} value={detail.days} defaultValue={1} onChange={e => { onChangeInputNumber(e, 'days') }} />
            <Input title="# Adultos" onBlur={e => { onFocusOut(e, 'adults') }} onFocus={e => { onFocus(e, 'adults') }} min={1} value={detail.adults} onChange={e => { onChangeInputNumber(e, 'adults') }} defaultValue={1} type={'number'} />
            <Input title="# Niños " onBlur={e => { onFocusOut(e, 'kids') }} onFocus={e => { onFocus(e, 'kids') }} min={0} value={detail.kids} onChange={e => { onChangeInputNumber(e, 'kids') }} defaultValue={0} type={'number'} />


            <Input title="fee Adulto" onBlur={e => { onFocusOut(e, 'adultFee') }} onFocus={e => { onFocus(e, 'adultFee') }} type="number" min={100} value={detail.adultFee} defaultValue={100} onChange={e => { onChangeInputNumber(e, 'adultFee') }} />
            <Input title="fee Niño" onBlur={e => { onFocusOut(e, 'kidFee') }} onFocus={e => { onFocus(e, 'kidFee') }} type="number" min={100} value={detail.kidFee} defaultValue={100} onChange={e => { onChangeInputNumber(e, 'kidFee') }} />
            <Input title="Traslado" onBlur={e => { onFocusOut(e, 'traslado') }} onFocus={e => { onFocus(e, 'traslado') }} type="number" min={0} value={detail.traslado} defaultValue={25} onChange={e => { onChangeInputNumber(e, 'traslado') }} />
            <Input title="Isla Saona" onBlur={e => { onFocusOut(e, 'islaSaona') }} onFocus={e => { onFocus(e, 'islaSaona') }} type="number" min={0} value={detail.islaSaona} defaultValue={80} onChange={e => { onChangeInputNumber(e, 'islaSaona') }} />
            <Input title="Santo Domingo" onBlur={e => { onFocusOut(e, 'santoDomingo') }} onFocus={e => { onFocus(e, 'santoDomingo') }} type="number" min={0} value={detail.santoDomingo} defaultValue={80} onChange={e => { onChangeInputNumber(e, 'santoDomingo') }} />

            <div className="col-span-4  flex gap-4">
                <div className="w-1/2">
                    <MultiSelectDropdown
                        prompt="Aerolineas"
                        options={aerolines}
                        onChange={e => { onChangeAerolines(e) }}
                    />
                </div>
                <div className="w-1/2">


                    <MultiSelectDropdown
                        prompt="Hoteles"
                        options={hotels}
                        onChange={e => { onChangeHotels(e) }} />
                </div>
            </div>

        </div>)


}

