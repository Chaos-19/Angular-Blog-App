import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octSearch } from "@ng-icons/octicons"
import { heroChevronDoubleRight } from "@ng-icons/heroicons/outline"

@Component({
    selector: "app-search",
    standalone: true,
    imports: [RouterLink, NgIconComponent],
    viewProviders: [provideIcons({ octSearch, heroChevronDoubleRight })],
    templateUrl: "./search.component.html",
    styles: ``
})
export class SearchComponent {}
