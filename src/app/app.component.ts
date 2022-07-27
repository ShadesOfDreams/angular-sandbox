import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';

  constructor(route: ActivatedRoute, router: Router) {
    router
      .events
      .pipe(filter((value) => value instanceof RoutesRecognized))
      .subscribe((value) => {
        if (value instanceof RoutesRecognized) {
          this.title = value.state.root.firstChild?.data['title'] || 'Unkown title';
        }
      });
  }
}
