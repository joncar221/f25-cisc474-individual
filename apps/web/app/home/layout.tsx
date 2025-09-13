import Link from 'next/link';
import './layout.css';
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className='LinkBar'>
                <div className='link'>
                    <Link href='/home'>HomePage</Link>
                </div>
                <div className='link'>
                    <Link href='/home/courses'>Courses</Link>
                </div>
                <div className='link'>
                    <Link href='/home/assignments'>Assignments</Link>
                </div>
                <div className='link'>
                    <Link href='/'>Log Out</Link>
                </div>
            </div>
            <section>{children}</section>

        </div>
    );
}