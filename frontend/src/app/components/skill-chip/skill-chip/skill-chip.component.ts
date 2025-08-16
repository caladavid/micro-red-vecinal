import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Skill } from '../../../../lib/models';

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  imports: [NgIf],
  template: `
  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
    <span class="font-medium">{{ skill.name }}</span>
    <span *ngIf="skill.level" class="text-white/60">Lvl {{ skill.level }}</span>
    <span class="text-emerald-400" *ngIf="skill.verified">✔︎ Verificada</span>
    <button class="text-xs hover:underline" (click)="endorse.emit(skill.name)">
      Apoyar ({{ skill.endorsements.length || 0 }})
    </button>
    <button class="text-xs text-emerald-400 hover:underline" *ngIf="canVerify" (click)="verify.emit(skill.name)">Verificar</button>
  </div>
  `,
})
export class SkillChipComponent {
  @Input() skill!: Skill;
  @Input() canVerify = false;
  @Output() endorse = new EventEmitter<string>();
  @Output() verify = new EventEmitter<string>();
}
