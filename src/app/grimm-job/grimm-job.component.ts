import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DisplayedJob, Job } from '../models/grimm-interfaces';
import { CommonModule } from '@angular/common';
import { RandomNumberService } from '../services/random-number.service';

@Component({
  selector: 'app-grimm-job',
  imports: [CommonModule],
  templateUrl: './grimm-job.component.html',
  styleUrl: './grimm-job.component.scss'
})
export class GrimmJobComponent implements OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;
  @Output() newJobEmitter: EventEmitter<boolean> = new EventEmitter();
  displayedJob: DisplayedJob = {
    detail: '',
    skillz: {
      title: '',
      descrip: '',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.random.shuffleArray(this.currentJob.details.table);
    this.random.shuffleArray(this.currentJob.skillz);
    this.rerollDetail();
    this.rerollSkillz();
  }

  emitNewJob() {
    this.newJobEmitter.emit(true);
  }

  rerollDetail() {
    let newIndex = this.currentJob.details.table.indexOf(this.displayedJob.detail);
    const isEndOfArray = newIndex + 1 === this.currentJob.details.table.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.displayedJob.detail = this.currentJob.details.table[newIndex];
  }

  rerollSkillz() {
    let newIndex = this.currentJob.skillz.findIndex(skill => skill.title === this.displayedJob.skillz.title);
    const isEndOfArray = newIndex + 1 === this.currentJob.skillz.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.displayedJob.skillz = this.currentJob.skillz[newIndex];
  }
}