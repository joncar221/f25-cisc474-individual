import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';

export const Route = createFileRoute('/home/inbox/page')({
  component: Inbox,
});

export default function Inbox() {
    return (
        <div className='content'>
            <LinkBar />
            <div>Inbox</div>
        </div>
    );
}