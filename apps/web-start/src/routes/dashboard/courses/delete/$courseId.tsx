import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseCreateIn, CourseOut } from '@repo/api';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../../../../integrations/fetcher';

export const Route = createFileRoute('/dashboard/courses/delete/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {courseId} = useParams({ from: '/dashboard/courses/delete/$courseId'});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => mutateBackend(`/courses/${courseId}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['courses']});
      navigate({to: '/dashboard/courses/page'});
    },
  });

  return (
    <div>
      <header>
        <h1>Delete a Course</h1>
      </header>
            <button className='changeButton'
              onClick={() => {
                mutation.mutate();
              }}
            >
              Delete Course
            </button>
          <hr></hr>
          <div className='changeButton'>
            <a href="/dashboard/courses/page">Back to Courses</a>
          </div>
          {mutation.isPending && <h1>Deleting...</h1>}
          {mutation.isError && <h1>Error when deleting this course.</h1>}
    </div>
  );
}