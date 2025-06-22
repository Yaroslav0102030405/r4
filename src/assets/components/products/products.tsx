import ProductList from "./productList";
export interface ProductType {
  id: number;
  name: string;
}

const Product = () => {
    const products = []

    for(let i = 0; i < 10; i += 1) {
        products.push({id: i + 1, name: `Продукт ${i + 1}`})
    }


    return ( <>
    <ProductList products={products} />
    </> );
}
 
export default Product;