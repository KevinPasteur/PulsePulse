import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateExercisePage } from './update-exercise.page';

describe('UpdateExercisePage', () => {
  let component: UpdateExercisePage;
  let fixture: ComponentFixture<UpdateExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
