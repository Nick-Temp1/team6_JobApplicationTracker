import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApplication } from './add-new-application';

describe('AddNewApplication', () => {
  let component: AddNewApplication;
  let fixture: ComponentFixture<AddNewApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
