export default function Button({children,...restProps}) {
    return (
        <button {...restProps} className="hover:text-blue-900">
            {children}
        </button>
    )
}