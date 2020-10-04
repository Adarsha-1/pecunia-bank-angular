import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtmComponent } from './add-atm.component';

describe('AddAtmComponent', () => {
  let component: AddAtmComponent;
  let fixture: ComponentFixture<AddAtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
