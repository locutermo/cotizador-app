import { useState } from "react"
export const useModal=()=>{
    const [showModal,setShowModal] = useState(false)
    const toogle = () => setShowModal(prev => !prev)

    return [showModal,toogle]
}