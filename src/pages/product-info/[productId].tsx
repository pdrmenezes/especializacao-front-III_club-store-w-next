import ProductInfoPage from "@/styles/ProductDetailPage.module.css";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { ProductType } from "../products/[teamId]";

const inter = Inter({ subsets: ["latin"] });

type ProductPropsType = {
  product: ProductType;
};

export default function ProductInfo({ product }: ProductPropsType) {
  return (
    <div className={inter.className}>
      <div className={ProductInfoPage.grid}>
        <div className={ProductInfoPage.card}>
          <Image src={product.urlImage} alt={product.name} height={300} width={300}></Image>
        </div>
        <div>
          <h1>{product.name}'s Info</h1>
          <h3>{product.maker}</h3>
          {product.discountPrice && product.available && (
            <div className={inter.className}>
              <p style={{ textDecoration: "line-through" }}>R$ {product.price}</p>
              <h3>R$ {product.discountPrice}</h3>
            </div>
          )}
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

type Params = {
  productId: string;
} & ParsedUrlQuery;

type Props = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const productId = context.params?.productId;

  const response = await fetch(`https://api-products-dh-next.vercel.app/product/${productId}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
};
