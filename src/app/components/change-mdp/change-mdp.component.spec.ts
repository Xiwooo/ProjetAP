import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMDPComponent } from './change-mdp.component';

describe('ChangeMDPComponent', () => {
  let component: ChangeMDPComponent;
  let fixture: ComponentFixture<ChangeMDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMDPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
