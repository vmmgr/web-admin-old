import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VmImageComponent} from './vm-image.component';

describe('VmImageComponent', () => {
  let component: VmImageComponent;
  let fixture: ComponentFixture<VmImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
