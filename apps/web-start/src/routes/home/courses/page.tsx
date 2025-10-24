import { createFileRoute, Link } from '@tanstack/react-router';
import LinkBar from '../../Components/LinkBar';
import { Suspense, useState, useEffect } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import './page.css';
import { backendFetcher } from '../../../integrations/fetcher';
import type { CourseOut } from '@repo/api';

const coursesQueryOptions = {
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<CourseOut>>('/courses'),
    initialData: [],
  };
  
  export const Route = createFileRoute('/home/courses/page')({
    component: Courses,
    loader: ({ context: { queryClient } }) =>
      queryClient.ensureQueryData(coursesQueryOptions),
  });


async function CourseList() {
    const { data, refetch, error, isFetching } = useQuery(coursesQueryOptions);

  if (isFetching) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }
    return (
            <ul>
                {data.map((course: any) => (
                    <li key={course.id}>
                        <br></br>
                        <div>{course.title}</div>
                        <div>{course.description}</div>
                        <Link to="/home/courses/edit/$courseId" params={{courseId: course.id}} className='changeButton'> Edit Course</Link>
                        
                        <Link to="/home/courses/delete/$courseId" params={{courseId: course.id}} className='changeButton'> Delete Course</Link>
                        
                        
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
                <Link to="/home/courses/create" className='createButton'>Create a New Course</Link>
                
                <Suspense fallback={<h1>Loading Courses...</h1>}>
                <CourseList />
                </Suspense>
            </div>
        </div>
    );
}