import { useCallback, useEffect, useState } from "react"

export default function TablePrice({ options, type, detail, onUpdateOptions }) {
    const { adults, kids } = detail
    useEffect(() => {
    }, [detail])

    return <table className="min-w-full border-2 border-slate-200 bg-white shadow-lg">
        <thead className="[&_th]:px-4 py-2">
            <th>Nombre</th>
            <th>Total</th>
            <th>P. x adulto</th>
            <th>P. x niño</th>
            {adults > 1 && (<th>P. x {adults} adultos</th>)}
            {kids > 1 && (<th>P. x {kids} niños</th>)}
        </thead>
        <tbody className="[&_td]:text-sm">
            {options?.map((option, index) => (
                <TablePriceRow key={index} option={option} type={type} detail={detail} onUpdateOptions={onUpdateOptions} />

            ))}
        </tbody>
    </table>
}

const TablePriceRow = ({ option, detail, type, onUpdateOptions }) => {
    const [price, setPrice] = useState(option.price)
    const { adults, kids } = detail

    const calAdultPriceToAeroline = price => (price > 0) && Math.round(price / (parseInt(adults) + parseInt(kids || 0)))
    const calKidsPriceToAeroline = price => (price > 0 && kids > 0) && Math.round(price / (parseInt(adults) + parseInt(kids)))

    const calAdultPriceToHotel = price => (price > 0) && Math.round((2 * price) / (2 * parseInt(adults) + parseInt(kids || 0)))
    const calKidsPriceToHotel = price => (price > 0 && kids > 0) && Math.round(price / (2 * parseInt(adults) + parseInt(kids)))

    useEffect(() => {
        console.log("Actualizando precios por renderizar el option " + option.name)
        console.log("De:" + price + " a " + option.price)
        setPrice(option.price)
    }, [option])

    useEffect(() => {

        onUpdateOptions({
            ...option,
            price,
            priceByAdults: type === "aeroline" ? calAdultPriceToAeroline(price) : calAdultPriceToHotel(price),
            priceByKids: type === "aeroline" ? calKidsPriceToAeroline(price) : calKidsPriceToHotel(price),
        })
    }, [detail])

    const onUpdateRow = useCallback((e) => {
        console.log(option.name)
        console.log(e.target.value)
        setPrice(e.target.value);
        onUpdateOptions({
            ...option,
            price: parseInt(e.target.value),
            priceByAdults: type === "aeroline" ? calAdultPriceToAeroline(e.target.value) : calAdultPriceToHotel(e.target.value),
            priceByKids: type === "aeroline" ? calKidsPriceToAeroline(e.target.value) : calKidsPriceToHotel(e.target.value),
        })
    }, [onUpdateOptions, option, detail])




    return <tr className="text-center [&_td]:py-2 [&_td]:px-4">
        <td className="text-start w-5/12">{option?.name}</td>
        <td className="w-2/12">
            <input type="number"
                value={option.price || ''}
                min={0}
                onChange={onUpdateRow}
                className="border-gray-400 bg-slate-50 py-1 px-2 w-full  text-center">
            </input>
        </td>
        <td className="w-2/12">{type === "aeroline" ? calAdultPriceToAeroline(price) : calAdultPriceToHotel(price)}</td>
        <td className="w-2/12">{type === "aeroline" ? calKidsPriceToAeroline(price) : calKidsPriceToHotel(price)}</td>
        {adults > 1 && (<td className="w-1/12">{type === "aeroline" ? (price > 0 && adults * calAdultPriceToAeroline(price)) : (price && adults * calAdultPriceToHotel(price))}</td>)}
        {kids > 1 && (<td className="w-1/12">{type === "aeroline" ? (price > 0 && kids * calKidsPriceToAeroline(price)) : (price > 0 && kids * calKidsPriceToHotel(price))}</td>)}
    </tr>
}