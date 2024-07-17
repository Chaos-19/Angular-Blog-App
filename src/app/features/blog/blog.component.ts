import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, RouterLink } from "@angular/router"

import { BlogListComponent } from "./blog-list/blog-list.component"
import { blogs } from "../../constants"

@Component({
    selector: "app-blog",
    standalone: true,
    imports: [CommonModule, BlogListComponent],
    templateUrl: "./blog.component.html",
    styles: ``
})
export class BlogComponent {
    blogList = blogs
}
