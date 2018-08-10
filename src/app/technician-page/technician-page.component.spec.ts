import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPageComponent } from './technician-page.component';

describe('TechnicianPageComponent', () => {
  let component: TechnicianPageComponent;
  let fixture: ComponentFixture<TechnicianPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
