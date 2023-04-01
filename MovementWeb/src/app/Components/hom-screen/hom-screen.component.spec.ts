import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomScreenComponent } from './hom-screen.component';

describe('HomScreenComponent', () => {
  let component: HomScreenComponent;
  let fixture: ComponentFixture<HomScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
