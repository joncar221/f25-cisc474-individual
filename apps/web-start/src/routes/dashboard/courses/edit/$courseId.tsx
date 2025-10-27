import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseUpdateIn, CourseOut } from '@repo/api';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../../../../integrations/fetcher';
import { useApiMutation } from '../../../../integrations/api';

export const Route = createFileRoute('/dashboard/courses/edit/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {courseId} = useParams({ from: '/dashboard/courses/edit/$courseId'});
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInstructorId, setNewInstructorId] = useState(
    '',
  );


  const queryClient = useQueryClient();
  
    const mutation = useApiMutation<CourseUpdateIn, CourseOut>({
      endpoint: (variables) => ({
        path: `/courses/${courseId}`,
        method: 'PATCH',
        onSuccess: (data: CourseOut) => {
          queryClient.setQueryData(['courses', data.id], data);
        },
      }),
      invalidateKeys: [['courses']],
    });

  return (
    <div>
      <header>
        <h1>Update a Course</h1>
      </header>
      {mutation.isPending ? (
        <div>Updating course...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>Error Updating course: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div>Course Updated successfully! ID: {mutation.data.id}</div>
          ) : null}
          <hr></hr>
          <div>
            <input
              type="text"
              placeholder="Course Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Instructor ID"
              value={newInstructorId}
              onChange={(e) => setNewInstructorId(e.target.value)}
            />
          </div>
          <div></div>
          <div className='changeButton'>
            <button
              onClick={() => {
                mutation.mutate({
                  title: newName,
                  description: newDescription,
                  instructorId: newInstructorId || mutation.data?.instructorId,
                });
              }}
            >
              Update Course
            </button>
          </div>
          <hr></hr>
          <div className='changeButton'>
            <Link to="/dashboard/courses/page">Back to Courses</Link>
          </div>
        </>
      )}
    </div>
  );
}