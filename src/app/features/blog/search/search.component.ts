import { Component,inject } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"

import { BlogService } from "../../../core/service/blog/blog.service"

import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octSearch } from "@ng-icons/octicons"

import { heroChevronDoubleRight } from "@ng-icons/heroicons/outline"
import { BlogListComponent } from "../blog-list/blog-list.component"

import type { blogs } from "../../../constants"

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
    blogPosts!: typeof blogs
    inputValue = ""
    blogService = inject(BlogService)


    constructor(){
        this .blogService.getAllBlogPost().then(posts=> this.blogPosts = posts)
    }


    onInputChange(event: Event) {
        const inputElement = event.target as HTMLInputElement
        this.inputValue = inputElement.value
        if (this.inputValue !== "")
            this.blogList = this.blogPosts.filter(blog =>
                blog.title.toLowerCase().includes(this.inputValue.toLowerCase())
            )
        else this.blogList = []
    }
}
