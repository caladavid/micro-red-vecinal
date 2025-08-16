import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationBarComponent } from './reputation-bar.component';

describe('ReputationBarComponent', () => {
  let component: ReputationBarComponent;
  let fixture: ComponentFixture<ReputationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReputationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReputationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
