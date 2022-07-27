import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

interface Line {
  showCommand: string,
  command?: any
}

declare global {
  interface HTMLElement {
    waitForClick(): Promise<any>
  }
}

@Component({
  selector: 'js-findings',
  template: `<div><table>
    <tr *ngFor="let line of commands">
      <td class="command-label">{{line.showCommand}}</td>
      <td class="command-value">{{line.command}}</td>
    </tr>
  </table><div>
    <div>
      <button #btn>Click me</button>
      <span>{{buttonMessage}}</span>
    </div>`,
  styleUrls: ['./js-findings.component.scss']
})
export class JSFindingsComponent implements AfterViewInit {
  commands: Array<Line> = [
    { showCommand: '[ ] + [ ]' },
    { showCommand: '[ ] + { }' },
    { showCommand: '{ } + [ ]' },
    { showCommand: '[ ] + 1' },
    { showCommand: '{ } + 1' },
  ];
  buttonMessage: string;

  @ViewChild('btn')
  button: ElementRef<HTMLButtonElement>;

  constructor() {
    this.commands.forEach((line) => {
      if (line.command === undefined) {
        line.command = eval(line.showCommand);
      }
    });
  }

  ngAfterViewInit(): void {
    this.eventToPromise();
    this.waitForClicks();
  }

  /**
   * Turn event to promise call.
   */
  eventToPromise() {
    // https://www.gimtec.io/articles/convert-on-click-to-promise/
    HTMLElement.prototype.waitForClick = function () {
      return new Promise((resolve => {
        this.addEventListener('click', resolve.bind(this, null));
      }))
    }
  }

  async waitForClicks(count = 1) {
    await this.button.nativeElement.waitForClick();
    this.buttonMessage = `Clicked ${count} times`;
    setTimeout(() => {
      this.buttonMessage = "";
    }, 1000);
    this.waitForClicks(++count);
  }
}
