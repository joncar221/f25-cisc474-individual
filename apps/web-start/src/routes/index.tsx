import { createFileRoute, Link } from '@tanstack/react-router';
import './page.css';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
        <div >
            <main >
                <h1>Login Page</h1>
                <div className="loginField">

                </div>
                
                <div className="loginButton">
                    <Link to={'/home/page'}>Home</Link>
                </div>
               

                
            </main>
            
        </div>
  )};

