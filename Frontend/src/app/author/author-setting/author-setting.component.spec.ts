import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSettingComponent } from './author-setting.component';

describe('AuthorSettingComponent', () => {
  let component: AuthorSettingComponent;
  let fixture: ComponentFixture<AuthorSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorSettingComponent]
    });
    fixture = TestBed.createComponent(AuthorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
