export type ExerciseRequest = {
  id: string;
  name: string;
  description: string;
  duration: number;
  repetitions: number;
  sets: number;
  level: string;
  bodyPart: Array<{
    name: string;
  }>;
  videoLink: string;
  commentLink: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
};
