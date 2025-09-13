import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Link from 'next/link';

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};



export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Login Here!</h1>
                
                <h2>
                    <Link href={'/home'}>Login</Link>
                </h2>
               

                
            </main>
            
        </div>
    );
}
