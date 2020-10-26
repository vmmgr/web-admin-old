import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDirectComponent } from './vm-direct.component';

describe('VmDirectComponent', () => {
  let component: VmDirectComponent;
  let fixture: ComponentFixture<VmDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmDirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
