import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateWorkoutPage } from './update-workout.page';

describe('UpdateWorkoutPage', () => {
  let component: UpdateWorkoutPage;
  let fixture: ComponentFixture<UpdateWorkoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
