import { Component } from '@angular/core';

interface Line {
  showCommand: string,
  command?: any
}

@Component({
  selector: 'js-findings',
  template: `<table>
    <tr *ngFor="let line of commands">
      <td class="command-label">{{line.showCommand}}</td>
      <td class="command-value">{{line.command}}</td>
    </tr>
  </table>`,
  styleUrls: ['./js-findings.component.scss']
})
export class JSFindingsComponent {
  commands: Array<Line> = [
    { showCommand: '[ ] + [ ]' },
    { showCommand: '[ ] + { }' },
    { showCommand: '{ } + [ ]' },
    { showCommand: '[ ] + 1' },
    { showCommand: '{ } + 1' },
  ];

  constructor() {
    this.commands.forEach((line) => {
      if (line.command === undefined) {
        line.command = eval(line.showCommand);
      }
    });
  }
}
