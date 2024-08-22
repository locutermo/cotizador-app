import { useId } from "react"

export default function Input({title,...restProps}){

    const id = useId()

    return (
        <div className="flex flex-col p-2 space-y-1">
            <label htmlFor={id}>{title}</label>
            <input id={id} className="border-gray-300 border-2 p-1 px-2" {...restProps}></input>
        </div>
        
    )
}