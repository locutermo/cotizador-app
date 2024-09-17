export function Label({color,children}){
    return (
        <div className={`px-4 py-2 ${color} rounded-full text-xs text-white`}>
            {children}
        </div>
    )
}