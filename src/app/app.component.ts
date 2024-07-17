import { Component } from "@angular/core"
import { RouterOutlet, RouterLink } from "@angular/router"
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component"

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, RouterLink, NavBarComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {
    title = "my-blog-app"
}
