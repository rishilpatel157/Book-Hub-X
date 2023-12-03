import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHomepageComponent } from './community-homepage.component';

describe('CommunityHomepageComponent', () => {
  let component: CommunityHomepageComponent;
  let fixture: ComponentFixture<CommunityHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityHomepageComponent]
    });
    fixture = TestBed.createComponent(CommunityHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
