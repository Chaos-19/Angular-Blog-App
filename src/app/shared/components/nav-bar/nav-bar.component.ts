import { Component } from "@angular/core"
import { CommenModul } from "@angular/commen"
import { octSearch, octSun, octThreeBars, octMoon } from "@ng-icons/octicons"
import { navLinks as menus } from "../../../constants"

@Component({
    selector: "app-nav-bar",
    standalone: true,
    imports: [CommenModul, NgIconComponent],
    viewProviders: [provideIcons({ octSearch, octSun, octThreeBars, octMoon })],
    templateUrl: "./nav-bar.component.html",
    styles: ``
})
export class NavBarComponent {
    bard = "kalkidan getachew"
    isNavbarOpen = false
    navLinks = menus

    toggleNavBar() {
        this.isNavbarOpen = !this.isNavbarOpen
    }
}
