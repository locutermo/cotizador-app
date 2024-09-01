import { useId } from "react"
export default function Select({ options, title, ...restProps }) {
    const id = useId()
    return (
        <div className="flex flex-col">
            {title && (
                <label className="mb-3 block text-black dark:text-white" htmlFor={id}>{title}</label>
            )}
            <select {...restProps} id={id} className="border-gray-300 p-1 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
                {options.map((option, index) => (
                    <option key={index} {...option}  />
                ))}
            </select>
        </div>
    )
}