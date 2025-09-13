import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import Link from 'next/link';
import './page.css'

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};

export default function Home() {
    return (
        <div >
            <main >
                <h1>Login Page</h1>
                <div className="loginField">

                </div>
                
                <div className="loginButton">
                    <Link href={'/home'}>Login</Link>
                </div>
               

                
            </main>
            
        </div>
    );
}
