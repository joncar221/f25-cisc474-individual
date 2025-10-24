import { createFileRoute, Link } from '@tanstack/react-router';
import './page.css';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
        <div >
            <main >
                <h1>Login Page</h1>
                <LoginButton />
               <hr></hr>
               

                
            </main>
            
        </div>
  )};

