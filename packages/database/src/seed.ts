import { prisma } from "./client";

import type { User, Course } from "../generated/client";

const DEFAULT_USERS = [
  {
    name: "Alice Johnson",
    email: "alice@school.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Bob Smith",
    email: "bob@school.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Evelyn Hart",
    email: "evelyn@school.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Charlie Brown",
    email: "charlie@student.com",
    role: "STUDENT",
  },
  {
    name: "Diana Prince",
    email: "diana@student.com",
    role: "STUDENT",
  },
  {
    name: "Franklin Stone",
    email: "franklin@student.com",
    role: "STUDENT",
  },
] as Array<Partial<User>>;

// --- COURSES ---
const DEFAULT_COURSES = [
  {
    title: "Biology 101",
    description: "Intro to Biology: cells, genetics, ecology, evolution.",
  },
  {
    title: "Calculus I",
    description: "Differential calculus with applications to real-world problems.",
  },
  {
    title: "World Literature",
    description: "Study of major literary works across cultures and eras.",
  },
  {
    title: "Computer Science Basics",
    description: "Intro to programming, algorithms, and data structures.",
  },
  {
    title: "Modern History",
    description: "History of the modern world from 1900 onward.",
  },
] as Array<Partial<Course>>;


(async () => {
  try {

    

    const courses = await Promise.all(
      DEFAULT_COURSES.map((course) =>
        prisma.course.upsert({
          where: {
            title: course.title,
          },
          update: {
            description: course.description,
          },
          create: {
            
              title: course.title!,
              description: course.description,
          },
        })
      )
    );

    const users = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            
              name: user.name,
              email: user.email,
              role: user.role,
          },
        })
      )
    );

    const instructors = users.filter((u) => u.role === "INSTRUCTOR");
    const students = users.filter((u) => u.role === "STUDENT");

    await prisma.user.update({
      where: { email: instructors[0]!.email! },
      data: {
        courses: {
          connect: [
            { id: courses[0]!.id }, // Biology 101
            { id: courses[2]!.id }, // World Literature
          ],
        },
      },
    });

    await prisma.user.update({
      where: { email: instructors[1]!.email! },
      data: {
        courses: {
          connect: [
            { id: courses[1]!.id }, // Calculus I
            { id: courses[3]!.id }, // CS Basics
          ],
        },
      },
    });

    await prisma.user.update({
      where: { email: instructors[2]!.email! },
      data: {
        courses: {
          connect: [{ id: courses[4]!.id }], // Modern History
        },
      },
    });

    await prisma.registered.create({
      data: {
        courseId: courses[4]!.id,
        studentId: students[0]!.id
      },
    });

    // --- Assignments ---
    const assignments = [
      {
        title: "Cell Structure Quiz",
        description: "Identify and describe major organelles in a eukaryotic cell.",
        courseId: courses[0]!.id,
      },
      {
        title: "Derivative Practice",
        description: "Compute derivatives of polynomial and exponential functions.",
        courseId: courses[1]!.id,
      },
      {
        title: "Analyzing Hamlet",
        description: "Discuss the theme of madness in Shakespeare's 'Hamlet'.",
        courseId: courses[2]!.id,
      },
      {
        title: "Sorting Algorithms",
        description: "Implement and compare bubble sort and quicksort.",
        courseId: courses[3]!.id,
      },
      {
        title: "WWII Timeline",
        description: "Create a timeline of key WWII events and their significance.",
        courseId: courses[4]!.id,
      },
      {
        title: "Photosynthesis Essay",
        description: "Explain the steps and importance of photosynthesis.",
        courseId: courses[0]!.id,
      },
    ];

    const createdAssignments = await Promise.all(
      assignments.map((a) =>
        prisma.assignment.upsert({
          where: { title: a.title },
          update: {},
          create: a,
        })
      )
    );

    // --- Submissions ---
    const submissions = [
      {
        title: createdAssignments[0]!.title,
        submission: "The nucleus controls the cell, mitochondria produce energy, and the Golgi body packages proteins.",
        grade: 88,
        assignmentId: createdAssignments[0]!.id,
      },
      {
        title: createdAssignments[1]!.title,
        submission: "The derivative of x^2 is 2x. The derivative of e^x is e^x.",
        grade: 91,
        assignmentId: createdAssignments[1]!.id,
      },
      {
        title: createdAssignments[2]!.title,
        submission: "Hamlet's madness can be seen as both real and feigned, contributing to the tragic outcome.",
        grade: 94,
        assignmentId: createdAssignments[2]!.id,
      },
      {
        title: createdAssignments[3]!.title,
        submission: "Bubble sort is simple but slow. Quicksort is more efficient for large datasets.",
        grade: 89,
        assignmentId: createdAssignments[3]!.id,
      },
      {
        title: createdAssignments[4]!.title,
        submission: "WWII began in 1939, with key events like Pearl Harbor, D-Day, and the atomic bombings.",
        grade: 90,
        assignmentId: createdAssignments[4]!.id,
      },
      {
        title: createdAssignments[5]!.title,
        submission: "Photosynthesis uses light to convert CO2 and water into glucose and oxygen.",
        grade: 87,
        assignmentId: createdAssignments[5]!.id,
      },
    ];

    await Promise.all(
      submissions.map((s) =>
        prisma.submission.upsert({
          where: { title: s.title },
          update: {},
          create: {...s}
        })
      )
    );
    
    
  } catch (error) {
    console.error("This is the error",error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
