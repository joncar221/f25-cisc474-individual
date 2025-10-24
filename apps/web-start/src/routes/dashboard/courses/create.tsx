import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseCreateIn, CourseOut } from '@repo/api';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../../../integrations/fetcher';

export const Route = createFileRoute('/dashboard/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newInstructorId, setNewInstructorId] = useState(
    '',
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCourse: CourseCreateIn) => {
      return mutateBackend<CourseOut>('/courses', 'POST', newCourse);
    },
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', data.id], data);
    },
  });

  return (
    <div>
      <header>
        <h1>Create a New Course</h1>
      </header>
      {mutation.isPending ? (
        <div>Creating course...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>Error creating course: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div>Course created successfully! ID: {mutation.data.id}</div>
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
          <div>
            <button
              onClick={() => {
                mutation.mutate({
                  title: newName,
                  description: newDescription,
                  instructorId: newInstructorId,
                });
              }}
            >
              Create Course
            </button>
          </div>
          <hr></hr>
          <div>
            <a href="/dashboard/courses/page">Back to Courses</a>
          </div>
        </>
      )}
    </div>
  );
}