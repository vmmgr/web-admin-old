import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDirectDetailComponent } from './vm-direct-detail.component';

describe('VmDirectDetailComponent', () => {
  let component: VmDirectDetailComponent;
  let fixture: ComponentFixture<VmDirectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmDirectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmDirectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
