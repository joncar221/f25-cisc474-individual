import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';

export const Route = createFileRoute('/dashboard/assignments/page')({
  component: Assignments,
});

export default function Assignments() {
    return (

        <div className='content'>
            <LinkBar />
      
            <div>Assignments</div>
        </div>
    );
}