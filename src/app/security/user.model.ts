export type User = {
    id: string;
    email: string;
    status: string;
    role: string;
    exercises: Array<{
      id: string
    }>;
    workouts: Array<{
      id: string
    }>
    username: string;
    createdAt: string;
    updatedAt: string;
  };
