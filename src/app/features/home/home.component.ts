import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

import { HeroComponent } from "./hero/hero.component"
import { BlogListComponent } from "../blog/blog-list/blog-list.component"

import { blogs } from "../../constants"

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, HeroComponent, BlogListComponent],
    templateUrl: "./home.component.html",
    styles: ``
})
export class HomeComponent {
    blogList = blogs
}
