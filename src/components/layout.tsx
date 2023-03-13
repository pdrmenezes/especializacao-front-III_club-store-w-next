import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <Link href={"/"}>
            <Image src="/dh-logo.svg" alt="Digital House Logo" width={100} height={48} priority />
          </Link>
        </div>
      </div>
      {children}
    </main>
  );
}
