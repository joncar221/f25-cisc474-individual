import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';
import './page.css';

export const Route = createFileRoute('/dashboard/backend/page')({
  component: Backend,
});


export default function Backend() {
    return (
        <div className='content'>
            <LinkBar />
            <div className='main'>
                <div>Backend</div>
                <div className='link'>
                    <Link to={'/dashboard/courses/page'}>Courses Data</Link>
                </div>
                <div className='link'>
                    <Link to={'/dashboard/users/page'}>Users Data</Link>
                </div>
            </div>
        </div>
    );
}