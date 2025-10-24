import { Link } from '@tanstack/react-router';

function LinkBar() {
    return (
        <div className='LinkBar'>
                  <div className='link'>
                      <Link to={'/home'}>HomePage</Link>
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
                  <div className='link'>
                      <Link to={'/home/backend/page'}>Backend</Link>
                  </div>
              </div>
    );
}

export default LinkBar;