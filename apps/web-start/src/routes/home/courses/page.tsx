import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';

export const Route = createFileRoute('/home/courses/page')({
  component: Courses,
});


export default function Courses() {
    return (
        <div className='content'>
            <LinkBar />
            <div>Courses</div>
        </div>
    );
}