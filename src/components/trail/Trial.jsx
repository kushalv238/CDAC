import { useState } from "react"

const Trial = (props) => {
    return (
        <div>
            <div>
                {props.num}
            </div>
            <div>
                <button onClick={props.increment}>+</button>
                <button onClick={props.decrement}>-</button>
            </div>
        </div>
    )
}

export default Trial