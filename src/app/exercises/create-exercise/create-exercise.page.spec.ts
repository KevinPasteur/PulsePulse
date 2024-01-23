import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExercisePage } from './create-exercise.page';

describe('CreateExercisePage', () => {
  let component: CreateExercisePage;
  let fixture: ComponentFixture<CreateExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
