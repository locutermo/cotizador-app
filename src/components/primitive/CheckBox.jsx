import { useId } from "react"

export default function CheckBox({ title, ...restProps }) {

    const id = useId()

    return (
        <div className="flex flex-row  justify-center items-center gap-6">
            {title && (
                <label className="text-center text-black dark:text-white" htmlFor={id}>{title}</label>
            )}
            <input id={id}
                {...restProps}
                type="checkbox"
                className="size-4"
            ></input>
        </div>

    )
}