import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsProps } from '../../types/types';

type RouteParams = {
  productId: string;
};

const ProductDetail: FC = () => {
  const { productId } = useParams<RouteParams>();
  const [product, setProduct] = useState<ProductsProps>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const getProductFetcher = async (id: string) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        const data = await response.json();

        setProduct(data);
      } catch (error: any) {
        setErrorMessage('Ürün bulanamadı');
      }
    };

    productId && getProductFetcher(productId);
  }, []);

  return (
    <>
      {productId && <h1>{product && product.title}</h1>}
      {!productId && <h1>{errorMessage}</h1>}
    </>
  );
};

export default ProductDetail;
