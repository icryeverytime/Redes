import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaPostsComponent } from './subida-posts.component';

describe('SubidaPostsComponent', () => {
  let component: SubidaPostsComponent;
  let fixture: ComponentFixture<SubidaPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubidaPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
