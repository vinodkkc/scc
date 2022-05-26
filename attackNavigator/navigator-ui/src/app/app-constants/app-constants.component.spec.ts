import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConstantsComponent } from './app-constants.component';

describe('AppConstantsComponent', () => {
  let component: AppConstantsComponent;
  let fixture: ComponentFixture<AppConstantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConstantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
