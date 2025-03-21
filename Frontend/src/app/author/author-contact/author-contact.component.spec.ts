import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorContactComponent } from './author-contact.component';

describe('AuthorContactComponent', () => {
  let component: AuthorContactComponent;
  let fixture: ComponentFixture<AuthorContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorContactComponent]
    });
    fixture = TestBed.createComponent(AuthorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
