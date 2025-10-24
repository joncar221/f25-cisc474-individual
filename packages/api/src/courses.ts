import { z } from 'zod';
import { Pagination } from './queries';

// Reference DTOs (lightweight relation embeds)
export const CourseRef = z.object({
  id: z.uuid(),
  name: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

// Output DTOs (API responses)
export const CourseOut = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  instructorId: z.uuid(),
  //createdAt: z.iso.datetime(),
  //updatedAt: z.iso.datetime(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// Creation DTOs (API request bodies)
export const CourseCreateIn = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  instructorId: z.uuid(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// Update DTOs (API request bodies)
export const CourseUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  instructorId: z.uuid().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

// Query DTOs (API query parameters)
export const CoursesListFilter = Pagination.extend({
  instructorId: z.uuid().optional(),
  nameLike: z.string().optional(),
});