import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReaderBookComponent } from './view-reader-book.component';

describe('ViewReaderBookComponent', () => {
  let component: ViewReaderBookComponent;
  let fixture: ComponentFixture<ViewReaderBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReaderBookComponent]
    });
    fixture = TestBed.createComponent(ViewReaderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
