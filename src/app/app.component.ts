import { Component, OnInit } from "@angular/core"
import { RouterOutlet, RouterLink } from "@angular/router"
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component"
import { ThemeService } from "./core/service/theme/theme.service"

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, RouterLink, NavBarComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
    title = "my-blog-app"

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.themeService.initializeTheme()
    }
}
