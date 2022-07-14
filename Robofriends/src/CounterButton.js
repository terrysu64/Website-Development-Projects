import React,{useState} from "react"

export const CounterButton = () => {
    const [cnt,setCnt] = useState(0)
    return <button id="counter" onClick={() => setCnt(cnt+1)}>{cnt}</button>
}