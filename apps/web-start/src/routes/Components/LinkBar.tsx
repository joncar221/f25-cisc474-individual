import { Link } from '@tanstack/react-router';

function LinkBar() {
    return (
        <div className='LinkBar'>
                  <div className='link'>
                      <Link to={'/home'}>HomePage</Link>
                  </div>
                  <div className='link'>
                      <Link to={'/dashboard/courses/page'}>Courses</Link>
                  </div>
                  <div className='link'>
                      <Link to={'/dashboard/assignments/page'}>Assignments</Link>
                  </div>
                  <div className='link'>
                      <Link to={'/dashboard/inbox/page'}>Inbox</Link>
                  </div>
                  <div className='link'>
                      <Link to={'/'}>Log Out</Link>
                  </div>
                  <div className='link'>
                      <Link to={'/dashboard/backend/page'}>Backend</Link>
                  </div>
              </div>
    );
}

export default LinkBar;