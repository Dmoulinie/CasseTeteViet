import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SolutionsComponent} from "./solutions/solutions.component";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from "./footer/footer.component";
import {ApiService} from "./services/api-service.service";
import {CasseTeteComponent} from "./casse-tete/casse-tete.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SolutionsComponent, FooterComponent, CasseTeteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'd-block' },

})
export class AppComponent {
  title = 'casseTeteFront';




}
