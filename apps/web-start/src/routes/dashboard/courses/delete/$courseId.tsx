import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseCreateIn, CourseOut } from '@repo/api';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../../../../integrations/fetcher';
import { useApiMutation } from '../../../../integrations/api';
import { title } from 'process';

export const Route = createFileRoute('/dashboard/courses/delete/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {courseId} = useParams({ from: '/dashboard/courses/delete/$courseId'});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useApiMutation<CourseOut>({
        endpoint: () => ({
          path: `/courses/${courseId}`,
          method: 'DELETE',
          onSuccess: () => {
            
          },
        }),
        invalidateKeys: [['courses']],
      });

  return (
    <div>
      <header>
        <h1>Delete a Course</h1>
      </header>
            <button className='changeButton'
              onClick={() => {
                mutation.mutate({
                  id: "",
                  title: "",
                  description: "",
                  instructorId: '',
                });
                navigate({to: '/dashboard/courses/page'});
              }}
            >
              Delete Course
            </button>
          <hr></hr>
          <div className='changeButton'>
            <Link to="/dashboard/courses/page">Back to Courses</Link>
          </div>
          {mutation.isPending && <h1>Deleting...</h1>}
          {mutation.isError && <h1>Error when deleting this course.</h1>}
    </div>
  );
}