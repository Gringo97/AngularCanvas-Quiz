import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilibComponent } from './milib.component';

describe('MilibComponent', () => {
  let component: MilibComponent;
  let fixture: ComponentFixture<MilibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
