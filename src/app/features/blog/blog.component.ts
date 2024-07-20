import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { heroChevronDoubleRight, heroChevronUp } from "@ng-icons/heroicons/outline"

import { BlogListComponent } from "./blog-list/blog-list.component"
import { blogs } from "../../constants"

@Component({
    selector: "app-blog",
    standalone: true,
    imports: [CommonModule, NgIconComponent, RouterLink, BlogListComponent],
    viewProviders: [provideIcons({ heroChevronDoubleRight })],
    templateUrl: "./blog.component.html",
    styles: ``
})
export class BlogComponent {
    blogList = blogs
    allTags: string[] = blogs
        .reduce((prev: string[], blog: (typeof blogs)[number]) => [...blog.tags, ...prev], [])
        .reduce(
            (prev: string[], current:string) => (prev.includes(current) ? prev : [current, ...prev]),
            []
        )
}
