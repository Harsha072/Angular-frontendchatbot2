import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateToChatComponent } from './navigate-to-chat.component';

describe('NavigateToChatComponent', () => {
  let component: NavigateToChatComponent;
  let fixture: ComponentFixture<NavigateToChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateToChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
