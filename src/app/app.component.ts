import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component"
import { HomeComponent } from "./features/home/home.component"

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, NavBarComponent, HomeComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {
    title = "my-blog-app"
}
