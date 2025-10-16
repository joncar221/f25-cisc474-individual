import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';

export const Route = createFileRoute('/home/backend/page')({
  component: Backend,
});


export default function Backend() {
    return (
        <div className='content'>
            <LinkBar />
            <div>Backend</div>
        </div>
    );
}