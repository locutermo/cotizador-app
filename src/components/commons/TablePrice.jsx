import { useCallback, useEffect, useState } from "react"
import Input from "../primitive/Input"

export default function TablePrice({ options, type, detail, onUpdateOptions }) {
    const { adults, kids } = detail
    useEffect(() => {
    }, [detail])

    return (
        <div className="flex flex-col gap-4 p-4 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">

            <table className="min-w-full ">
                <thead className="[&_th]:px-4 py-6">
                    <tr>
                        <th className="text-start">Nombre</th>
                        <th>Total</th>
                        <th className="hidden md:table-cell">PxA</th>
                        {adults > 1 && (<th className="hidden md:table-cell">Px{adults}A</th>)}
                        {kids > 0 && (<th className="hidden md:table-cell">PxN</th>)}
                        {kids > 1 && (<th className="hidden md:table-cell">Px{kids}N</th>)}
                    </tr>
                </thead>
                <tbody className="[&_td]:text-sm">
                    {options?.length > 0 ? options.map((option, index) => (
                        <TablePriceRow key={index} option={option} type={type} detail={detail} onUpdateOptions={onUpdateOptions} />

                    )) : (<tr>
                        <td
                            className=" text-center p-8 my-10"
                            colSpan={5}
                        >
                            No hay opciones seleccionadas
                        </td>
                    </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

const TablePriceRow = ({ option, detail, type, onUpdateOptions }) => {
    const [price, setPrice] = useState(option.price)
    const { adults, kids } = detail

    const calAdultPriceToAeroline = price => (price > 0) && Math.round(price / (parseInt(adults) + parseInt(kids || 0)))
    const calKidsPriceToAeroline = price => (price > 0 && kids > 0) && Math.round(price / (parseInt(adults) + parseInt(kids)))

    const calAdultPriceToHotel = price => (price > 0) && Math.round((2 * price) / (2 * parseInt(adults) + parseInt(kids || 0)))
    const calKidsPriceToHotel = price => (price > 0 && kids > 0) && Math.round(price / (2 * parseInt(adults) + parseInt(kids)))

    useEffect(() => {
        setPrice(option.price)
    }, [option])

    useEffect(() => {
        onUpdateOptions({
            ...option,
            priceByAdults: type === "aeroline" ? calAdultPriceToAeroline(option.price) : calAdultPriceToHotel(option.price),
            priceByKids: type === "aeroline" ? calKidsPriceToAeroline(option.price) : calKidsPriceToHotel(option.price),
        })
    }, [detail])

    const onUpdateRow = useCallback((e) => {
        setPrice(e.target.value);
        onUpdateOptions({
            ...option,
            price: parseInt(e.target.value),
            priceByAdults: type === "aeroline" ? calAdultPriceToAeroline(e.target.value) : calAdultPriceToHotel(e.target.value),
            priceByKids: type === "aeroline" ? calKidsPriceToAeroline(e.target.value) : calKidsPriceToHotel(e.target.value),
        })
    }, [onUpdateOptions, option, detail])




    return <tr className="text-center [&_td]:py-2 [&_td]:px-4 dark:text-white">
        <td className="text-start w-1/2 md:w-6/12">{option?.name}</td>
        <td className="w-1/2 md:w-2/12">
            <Input type="number"
                value={option.price || ''}
                min={0}
                onChange={onUpdateRow}
            />
        </td>
        <td className="hidden md:table-cell font-extrabold dark:font-bold md:w-2/12">{type === "aeroline" ? calAdultPriceToAeroline(price) : calAdultPriceToHotel(price)}</td>
        {adults > 1 && (<td className="hidden md:table-cell md:w-1/12">{type === "aeroline" ? (price > 0 && adults * calAdultPriceToAeroline(price)) : (price && adults * calAdultPriceToHotel(price))}</td>)}
        {kids > 0 && (<td className="hidden font-extrabold dark:font-bold md:table-cell md:w-1/12">{type === "aeroline" ? calKidsPriceToAeroline(price) : calKidsPriceToHotel(price)}</td>)}
        {kids > 1 && (<td className="hidden md:table-cell md:w-1/12">{type === "aeroline" ? (price > 0 && kids * calKidsPriceToAeroline(price)) : (price > 0 && kids * calKidsPriceToHotel(price))}</td>)}
    </tr>
}