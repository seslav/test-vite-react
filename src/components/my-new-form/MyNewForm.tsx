
import { useState } from 'react'
import { useSubmit } from './hooks/useSubmit'

function Calc() {
    const [sum, setSum] = useState(0)
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)

    const useSub = useSubmit(setSum)

    const setValue = (text: string, fn: (a: number) => void ) => {
        let p = parseInt(text)
        if (!isNaN(p)) {
            fn(p);
        } else {
            fn(0);
        }
    }

    return (
        <div>
            <hr/>
            <h2>Hi, I am a Calculator!</h2>
            <input value={a} 
                type='numeric'
                onChange={(event) => {
                    setValue(event.target.value, setA)
                }}
            />
            <input value={b}
                onChange={(event) => {
                    setValue(event.target.value, setB)
                }}
            />
            <button onClick={() => {useSub.calculateSum(a, b)}}>
                sum
            </button>
            <h2> sum is {sum}</h2>
        </div>
    )
  }
  
  export default Calc;
  