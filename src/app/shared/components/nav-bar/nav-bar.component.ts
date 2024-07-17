import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octSearch, octSun, octThreeBars, octMoon } from "@ng-icons/octicons"
import { navLinks as menus } from "../../../constants"

@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [CommonModule, RouterLink, NgIconComponent],
    viewProviders: [provideIcons({ octSearch, octSun, octThreeBars, octMoon })],
    templateUrl: "./nav-bar.component.html",
    styles: ``
})
export class NavBarComponent {
    brand = "kalkidan getachew"
    isNavbarOpen = false
    navLinks = menus

    toggleNavBar() {
        this.isNavbarOpen = !this.isNavbarOpen
    }
}
