import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LinkBar from './Components/LinkBar';
import './page.css';
import './dashboard/layout.css';

export const Route = createFileRoute('/home')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
        <div>
        <LinkBar />
      <div className='main'>
        
        User Information: {JSON.stringify(user, null, 2)}.
      </div>
      </div>
    )
  );
}