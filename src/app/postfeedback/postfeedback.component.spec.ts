import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfeedbackComponent } from './postfeedback.component';

describe('PostfeedbackComponent', () => {
  let component: PostfeedbackComponent;
  let fixture: ComponentFixture<PostfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostfeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
