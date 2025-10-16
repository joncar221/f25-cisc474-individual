import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';
import { Suspense, useState, useEffect } from 'react';
import './page.css';
import { backendFetcher } from '../../../integrations/fetcher';

export const Route = createFileRoute('/home/courses/page')({
  component: Courses,
});

interface Course {
    id: string;
    title: string;
}


async function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        
        useEffect(() => {
            
            async function loadCourses() {
                try {
                    const getCourses = await backendFetcher<Course[]>('/courses');
                    const data = await getCourses();
                    setCourses(data);
                } catch (err: any) {
                    console.log(err);
                    setError(err.message || "Failed to fetch courses");
    
                } finally {
                    setLoading(false);
                }
        
            }
            loadCourses();
        }, []);
    
        if (loading) return <h1>Loading Courses...</h1>;
        if (error) return <h1>{error}</h1>;
    
    return (
            <ul>
                {courses.map((course: any) => (
                    <li key={course.id}>
                        <div>{course.title}</div><br></br>
                    </li>
                ))}
            </ul>
    )
}

export default function Courses() {
    return (
        <div className='content'>
            <LinkBar />
            <div className='main'>
                <div>Courses</div>
                <Suspense fallback={<h1>Loading Courses...</h1>}>
                <CourseList />
                </Suspense>
            </div>
        </div>
    );
}