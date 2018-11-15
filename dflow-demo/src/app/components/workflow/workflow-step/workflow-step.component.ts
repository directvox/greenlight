import { Component, OnInit } from '@angular/core';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-workflow-step',
  templateUrl: './workflow-step.component.html',
  styleUrls: ['./workflow-step.component.scss']
})
export class WorkflowStepComponent implements OnInit {

  step: Step;
  allDepsSatisfied = false;
  isStart = false;
  obtainedCert = false;

  actionURL: string;
  actionTxt: string;

  constructor() {  }

  ngOnInit() {
    // generate component state variables
    if (this.step.dependencies.length > 0) {
      this.allDepsSatisfied = this.step.dependencies.map((item) => {
        return item.isAvailable;
      }).reduce((acc, cur) => {
        return acc && cur;
      });
    } else {
      this.isStart = true;
    }

    // prepare actionURL and actionTxt
    if (this.isStart || this.allDepsSatisfied) {
      this.actionTxt = `Enroll with ${this.step.issuer.name}`;
      this.actionURL = this.step.issuer.url;
    } else if (this.obtainedCert) {
      this.actionTxt = 'View record';
      // this.actionURL = `/topic/${topic.id}/cred/${credential.id}`;
    } else {
      this.actionTxt = 'Dependencies not met';
      this.actionURL = null;
    }
  }

}
