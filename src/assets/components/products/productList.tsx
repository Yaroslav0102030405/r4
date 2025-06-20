import { useState } from "react";
import type { ProductType } from "./products"; 
// 1. Визначення інтерфейсу для пропсів компонента ProductList
interface ProductListProps {
  products: ProductType[]; // products має бути масивом об'єктів ProductType
}

const ProductList : React.FC<ProductListProps> = ({products}) => {
     const [filterd, setFiltered] = useState<string>("");

    const filteredProducts = products.filter((product: ProductType) => (
        product.name.toLowerCase().includes(filterd.toLowerCase())
    ))

    const handleFiltered = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltered(event.target.value)
    }
    return ( <>
    <form>
        <label><input type="text" value={filterd} onChange={handleFiltered} />Пошук</label>
    </form>
    <ul>{
        filteredProducts.map((product) => (
            <li key={product.id}><p>{product.name}</p></li>
        ))}</ul>
    </> );
}
 
export default ProductList;