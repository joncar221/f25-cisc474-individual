import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';
import { Suspense, useState, useEffect } from 'react';
import './page.css';
import { backendFetcher } from '../../../integrations/fetcher';

export const Route = createFileRoute('/home/users/page')({
  component: Users,
});

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}



async function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        
        async function loadUsers() {
            try {
                const getUsers = await backendFetcher<User[]>('/users');
                const data = await getUsers();
                setUsers(data);
            } catch (err: any) {
                console.log(err);
                setError(err.message || "Failed to fetch users");

            } finally {
                setLoading(false);
            }
    
        }
        loadUsers();
    }, []);

    if (loading) return <h1>Loading Users...</h1>;
    if (error) return <h1>{error}</h1>;


    return (
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                        <div>{user.role}</div><br></br>
                    </li>
                ))}
            </ul>
    )
}

export default function Users() {
    return (
        
        <div className='content'>

            <LinkBar />
            <div className='main'>
                <div>Users</div>
                <Suspense fallback={<h1>Loading Users...</h1>}>
                <UserList />
                </Suspense>
            </div>
        </div>
    );
}