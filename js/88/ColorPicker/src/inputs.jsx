import React,{useState} from "react";

export default function MyInputs(){
    const [data, setData] = useState({color:'',background:'',font:'18'})

    const handleColor = e =>{
        document.body.style.color = e.target.value
        setData({...data,color:e.target.value})
    }

    const handleBackground = e =>{
        document.body.style.backgroundColor = e.target.value
        setData({...data,background:e.target.value})
    }

    const handleFont =  e => {
         setData({...data,font:e.target.value})
    }

    return(
        <div style={{fontSize: `${data.font}px`}}>
            <label> Background: <input type="color" onChange={handleBackground}></input></label>
            <label> Color: <input type="color" onChange={handleColor}></input></label>
            <label> Font: <input type="number" value={data.font} min={12} max={24} onChange={handleFont}></input></label>
        </div>
    )
}

