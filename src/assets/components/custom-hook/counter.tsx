import { useCounter } from "./customhook";
import { useEffect } from "react";

const Counter = () => {
    const [count, increment, decrement, reset] = useCounter(0, 5)
    
    useEffect(() => {
console.log("useEffect",count)
    },[count])

    return (<>
    <h1>Счетчик{count}</h1>
    <button onClick={increment}>Додати</button>
    <button onClick={decrement}>Відняти</button>
    <button onClick={reset}>Збросити</button>
    </>  );
}
 
export default Counter;