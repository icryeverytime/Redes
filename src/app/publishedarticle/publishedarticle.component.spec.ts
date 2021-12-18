import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedarticleComponent } from './publishedarticle.component';

describe('PublishedarticleComponent', () => {
  let component: PublishedarticleComponent;
  let fixture: ComponentFixture<PublishedarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedarticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
