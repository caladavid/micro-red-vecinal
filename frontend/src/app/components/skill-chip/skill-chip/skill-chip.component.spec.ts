import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillChipComponent } from './skill-chip.component';

describe('SkillChipComponent', () => {
  let component: SkillChipComponent;
  let fixture: ComponentFixture<SkillChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
