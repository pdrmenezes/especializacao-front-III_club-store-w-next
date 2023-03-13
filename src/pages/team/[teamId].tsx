import ProductInfoPage from "@/styles/ProductDetailPage.module.css";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { TeamType } from "..";

const inter = Inter({ subsets: ["latin"] });

type PropsType = {
  teamDetails: TeamType;
};

export default function TeamPage({ teamDetails }: PropsType) {
  return (
    <div className={inter.className}>
      <div className={ProductInfoPage.grid}>
        <div className={ProductInfoPage.card}>
          <Image src={teamDetails.image} alt={teamDetails.name} height={300} width={300}></Image>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h1>{teamDetails.name}</h1>
          <p>{teamDetails.description}</p>
        </div>
      </div>
    </div>
  );
}

type Params = {
  teamId: string;
} & ParsedUrlQuery;

type Props = {
  teamDetails?: TeamType;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
  const id = context.params?.teamId;
  const response = await fetch(`https://api-products-dh-next.vercel.app/teams/${id}`);
  const responseObject = await response.json();
  const teamDetails = responseObject.response;

  return {
    props: {
      teamDetails,
    },
  };
};
