import { useState, useCallback } from "react";

// Визначаємо тип для функції-збільшення/зменшення/скидання
type CounterAction = () => void;

// Типізуємо хук useCounter
// Він приймає `initialValue` типу `number`
// І повертає кортеж (tuple) з 4 елементів:
// - count: number (поточне значення лічильника)
// - increment: CounterAction (функція для збільшення)
// - decrement: CounterAction (функція для зменшення)
// - reset: CounterAction (функція для скидання)
export const useCounter = (initialValue: number, stepValue: number): [number, CounterAction, CounterAction, CounterAction] => {
  const [count, setCount] = useState<number>(initialValue);

  // useCallback використовується для мемоізації функцій,
  // щоб вони не створювалися заново при кожному ререндері,
  // якщо їх залежності не змінилися. Це оптимізація продуктивності.
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + stepValue);
  }, [stepValue]); // Пустий масив залежностей означає, що функція створюється один раз

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - stepValue);
  }, [stepValue]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]); // Залежить від initialValue

  return [count, increment, decrement, reset];
};