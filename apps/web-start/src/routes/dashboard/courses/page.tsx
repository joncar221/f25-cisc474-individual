import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';
import { Suspense, useState, useEffect } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import './page.css';
import { backendFetcher } from '../../../integrations/fetcher';
import type { CourseOut } from '@repo/api';
import { useApiQuery, useCurrentUser } from '../../../integrations/api';

const coursesQueryOptions = {
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<CourseOut>>('/courses'),
    initialData: [],
  };
  
  export const Route = createFileRoute('/dashboard/courses/page')({
    component: Courses,
    loader: ({ context: { queryClient } }) =>
      queryClient.ensureQueryData(coursesQueryOptions),
  });


async function CourseList() {
    const { data: user } = useCurrentUser();
  const query = useApiQuery<Array<CourseOut>>(['courses'], '/courses');

  const { data, refetch, error, showLoading } = query;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (showLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No courses found.</div>;
  }
    return (
            <ul>
                {data.map((course: any) => (
                    <li key={course.id}>
                        <br></br>
                        <div>{course.title}</div>
                        <div>{course.description}</div>
                        <Link to="/dashboard/courses/edit/$courseId" params={{courseId: course.id}} className='changeButton'> Edit Course</Link>
                        
                        <Link to="/dashboard/courses/delete/$courseId" params={{courseId: course.id}} className='changeButton'> Delete Course</Link>
                        
                        
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
                <Link to="/dashboard/courses/create" className='createButton'>Create a New Course</Link>
                
                <Suspense fallback={<h1>Loading Courses...</h1>}>
                <CourseList />
                </Suspense>
            </div>
        </div>
    );
}