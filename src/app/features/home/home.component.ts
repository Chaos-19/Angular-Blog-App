import { Component } from "@angular/core"
import { HeroComponent } from "./hero/hero.component"
@Component({
    selector: "app-home",
    standalone: true,
    imports: [HeroComponent],
    templateUrl: "./home.component.html",
    styles: ``
})
export class HomeComponent {}
