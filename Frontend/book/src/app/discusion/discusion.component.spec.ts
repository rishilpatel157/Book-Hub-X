import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscusionComponent } from './discusion.component';

describe('DiscusionComponent', () => {
  let component: DiscusionComponent;
  let fixture: ComponentFixture<DiscusionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscusionComponent]
    });
    fixture = TestBed.createComponent(DiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
