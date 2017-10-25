import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicanvasComponent } from './micanvas.component';

describe('MicanvasComponent', () => {
  let component: MicanvasComponent;
  let fixture: ComponentFixture<MicanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
