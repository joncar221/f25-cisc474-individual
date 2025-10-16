import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../Components/LinkBar';
import './layout.css';

export const Route = createFileRoute('/home/page')({
  component: Login,
});


export default function Login() {
    return (
      <div className='content'>
        <LinkBar />

      </div>
    );
}