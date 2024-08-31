import { useSelector } from "react-redux"
export default function Home() {
    const states = useSelector(state => state.cotization)
    return <div className="w-full min-h-lvh">
        <h1>Estados: {JSON.stringify(states)}</h1>
    </div>
}