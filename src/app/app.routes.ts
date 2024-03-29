import { Routes } from '@angular/router';
import { onlyAuthenticated } from './security/only-authenticated.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.page').then((m) => m.LayoutPage),
    canActivate: [onlyAuthenticated],
    children: [
      {
        path: 'library',
        loadComponent: () =>
          import('./layout/library/library.page').then((m) => m.LibraryPage),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'create-exercise',
    loadComponent: () =>
      import('./exercises/create-exercise/create-exercise.page').then(
        (m) => m.CreateExercisePage
      ),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'workout-detail/:id',
    loadComponent: () =>
      import('./layout/workout-detail/workout-detail.page').then(
        (m) => m.WorkoutDetailPage
      ),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'update-exercise/:id',
    loadComponent: () =>
      import('./exercises/update-exercise/update-exercise.page').then(
        (m) => m.UpdateExercisePage
      ),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'community',
    loadComponent: () =>
      import('./layout/community/community.page').then((m) => m.CommunityPage),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'create-workout',
    loadComponent: () =>
      import('./workouts/create-workout/create-workout.page').then(
        (m) => m.CreateWorkoutPage
      ),
    canActivate: [onlyAuthenticated],
  },
  {
    path: 'update-workout/:id',
    loadComponent: () =>
      import('./workouts/update-workout/update-workout.page').then(
        (m) => m.UpdateWorkoutPage
      ),
    canActivate: [onlyAuthenticated],
  },
];
