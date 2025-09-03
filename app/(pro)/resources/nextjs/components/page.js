'use client';
import { useEffect, useState } from "react"

const Example = () => {
    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(600)
    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
    }, [width, height])

    return (
        <div className="flex flex-col items-center justify-center  overflow-hidden max-height-80">
            <div>
                <button onClick={() => setPopUp(!popUp)}> Open </button>
            </div>

            {popUp &&

                <div style={{ width, height }} className="rounded-xl bg-gray-100 flex items-center justify-center px-8 py-8">
                    <div className="flex flex-col">
                        <label htmlFor="width">Width </label>
                        <input value={width} id="width" onChange={e => setWidth(e.target.value && parseInt(e.target.value) || 0)} />
                        <label htmlFor="height"> Height </label>
                        <input value={height} id="height" onChange={e => setHeight(e.target.value ? parseInt(e.target.value) : 100)} />
                    </div>
                </div>}
        </div>
    )
}

export default Example;