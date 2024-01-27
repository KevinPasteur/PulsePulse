import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDetailPage } from './workout-detail.page';

describe('WorkoutDetailPage', () => {
  let component: WorkoutDetailPage;
  let fixture: ComponentFixture<WorkoutDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkoutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
