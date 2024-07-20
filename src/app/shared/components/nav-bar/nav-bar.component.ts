import { Component, onInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octSearch, octSun, octThreeBars, octMoon } from "@ng-icons/octicons"
import { navLinks as menus } from "../../../constants"
import { ThemeService } from "../../../core/service/theme/theme.service"
@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [CommonModule, RouterLink, NgIconComponent],
    viewProviders: [provideIcons({ octSearch, octSun, octThreeBars, octMoon })],
    templateUrl: "./nav-bar.component.html",
    styles: ``
})
export class NavBarComponent implements onInit {
    brand = "kalkidan getachew"
    isNavbarOpen = false
    navLinks = menus
    theme: "light" | "dark"

    constructor(private themeService: ThemeService) {}
    
    ngOnInit() {
        this.theme = this.themeService.currentTheme()
    }
    toggleNavBar() {
        this.isNavbarOpen = !this.isNavbarOpen
    }

    toggleDarkMode() {
        this.themeService.toggleTheme()
    }
}
