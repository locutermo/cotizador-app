import { useEffect, useState } from "react";
import Input from "../../primitive/Input";

export default function Form({ title, inputs, callback, initialValues }) {

    const [data, setData] = useState({})

    useEffect(() => {
        if (initialValues) {
            let newData = {}
            inputs.forEach(input => {
                newData[input.attribute] = initialValues[input.attribute] || ''
            });
            setData({ id: initialValues.id, ...newData })
        }


    }, [initialValues, inputs])

    const clean = () => {
        let newData = { ...data }
        inputs.forEach(input => {
            newData[input.attribute] = ''
        });
        const id = data.id
        if (id) {
            newData['id'] = data.id
        }

        setData(newData)
    }


    return (
        <div className="grid grid-cols-1 gap-4 p-4 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            {title && (
                <div className="uppercase dark:text-white">
                    {title}
                </div>
            )}
            {inputs.map(({ title, attribute, type, disabled = false, ...restAttributes }, index) => (
                <Input
                    disabled={disabled}
                    {...restAttributes}
                    key={index}
                    title={title}
                    type={type || 'text'}
                    value={data[attribute]}
                    onChange={e => { setData(prev => ({ ...prev, [attribute]: e.target.value })) }}
                />
            ))}
            <div className="flex justify-between">
                <button className="text-red-700" onClick={e => { clean() }}>Limpiar</button>
                <button onClick={e => { callback(data); clean() }}>Guardar</button>
            </div>
        </div>
    )
}