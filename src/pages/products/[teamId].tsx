import styles from "@/styles/Home.module.css";
import productStyles from "@/styles/ProductsPage.module.css";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { TeamType } from "..";

const inter = Inter({ subsets: ["latin"] });

export type ProductType = {
  _id: string;
  available: boolean;
  name: string;
  maker: string;
  urlImage: string;
  description: string;
  price: number;
  discountPrice: number;
};

type PropsType = {
  products: ProductType[];
  team: TeamType;
};

export default function TeamProducts(props: PropsType) {
  const { team, products } = props;
  const { name } = team;

  return (
    <>
      <h1 className={inter.className}>{name}</h1>
      {products.length < 1 ? (
        <h1>Ops, não encontramos nenhum produto do {team.name} 🙁</h1>
      ) : (
        <div className={productStyles.grid}>
          {products.map((product) => {
            return (
              <Link href={{ pathname: `/product-info/${product._id}` }} className={styles.card} key={team._id}>
                <Image src={product.urlImage} alt={team.name} width={80} height={80}></Image>
                <h2 className={inter.className}>{product.name}</h2>
                {product.discountPrice && product.available && (
                  <div className={inter.className}>
                    <p style={{ textDecoration: "line-through" }}>R$ {product.price}</p>
                    <h3>R$ {product.discountPrice}</h3>
                  </div>
                )}
                {!product.discountPrice && !product.available && <h3 className={inter.className}>Indisponível</h3>}
                {!product.discountPrice && <p className={inter.className}>R$ {product.price}</p>}
                <h2>
                  <span className={inter.className}>-&gt;</span>
                </h2>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

type Params = {
  teamId: string;
} & ParsedUrlQuery;

type Props = {
  team?: TeamType;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const id = context.params?.teamId;
  const response = await fetch("https://api-products-dh-next.vercel.app/teams");
  const teams = await response.json();
  const team = teams.find((team: TeamType) => team._id === id);

  const responseProducts = await fetch(`https://api-products-dh-next.vercel.app/products/${id}`);
  const products = await responseProducts.json();

  return {
    props: {
      team,
      products,
    },
  };
};
