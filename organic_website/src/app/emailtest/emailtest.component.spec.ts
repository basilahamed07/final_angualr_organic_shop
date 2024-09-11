import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtestComponent } from './emailtest.component';

describe('EmailtestComponent', () => {
  let component: EmailtestComponent;
  let fixture: ComponentFixture<EmailtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailtestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
