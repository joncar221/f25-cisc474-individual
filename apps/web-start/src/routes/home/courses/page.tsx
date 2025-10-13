import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/home/courses/page')({
  component: Courses,
});


export default function Courses() {
    return (
        <div className='content'>
      <div className='LinkBar'>
          <div className='link'>
              <Link to={'/home/page'}>HomePage</Link>
          </div>
          <div className='link'>
              <Link to={'/home/courses/page'}>Courses</Link>
          </div>
          <div className='link'>
              <Link to={'/home/assignments/page'}>Assignments</Link>
          </div>
          <div className='link'>
              <Link to={'/home/inbox/page'}>Inbox</Link>
          </div>
          <div className='link'>
              <Link to={'/'}>Log Out</Link>
          </div>
      </div>
    <div>Courses</div>
  </div>
    );
}