import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octSearch } from "@ng-icons/octicons"
import { heroChevronDoubleRight } from "@ng-icons/heroicons/outline"
import { BlogListComponent } from "../blog-list/blog-list.component"

import { blogs } from "../../../constants"

@Component({
    selector: "app-search",
    standalone: true,
    imports: [RouterLink, NgIconComponent, CommonModule, BlogListComponent],
    viewProviders: [provideIcons({ octSearch, heroChevronDoubleRight })],
    templateUrl: "./search.component.html",
    styles: ``
})
export class SearchComponent {
    blogList: typeof blogs = []
    inputValue = ""

    onInputChange(event: Event) {
        const inputElement = event.target as HTMLInputElement
        this.inputValue = inputElement.value
        if (this.inputValue !== "")
            this.blogList = blogs.filter(blog => blog.title.includes(this.inputValue))
        else this.blogList = []
    }
}
