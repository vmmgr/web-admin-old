import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoVMImageComponent} from './no-vmimage.component';

describe('NoVMImageComponent', () => {
  let component: NoVMImageComponent;
  let fixture: ComponentFixture<NoVMImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoVMImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoVMImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
