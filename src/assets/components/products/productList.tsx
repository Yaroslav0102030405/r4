import { useState, useEffect} from "react";
import type { ProductType } from "./products"; 
import { useDebounce } from 'use-debounce';
// 1. Визначення інтерфейсу для пропсів компонента ProductList
interface ProductListProps {
  products: ProductType[]; // products має бути масивом об'єктів ProductType
}

const ProductList : React.FC<ProductListProps> = ({products}) => {
     const [filterd, setFiltered] = useState<string>("");
     const [debouncedFilterd] = useDebounce(filterd, 500)
    //  const [isPending, setIsPending] = useTransition()

    const filteredProducts = products.filter((product: ProductType) => (
        product.name.toLowerCase().includes(debouncedFilterd.toLowerCase())
    ))

    useEffect(() => {
        console.log(debouncedFilterd)
    }, [debouncedFilterd])

    const handleFiltered = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltered(event.target.value)
    }
    return ( <>
    <form>
        <label><input type="text" value={filterd} onChange={handleFiltered} />Пошук</label>
    </form>
    {/* <ul>{
        filteredProducts.map((product) => (
            <li key={product.id}><p>{product.name}</p></li>
        ))}</ul> */}
         {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                            <p>{product.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Такого {filterd} в базе данных нет.</p>
            )}
    </> );

    
}
 
export default ProductList;