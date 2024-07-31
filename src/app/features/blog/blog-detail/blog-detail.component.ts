import { Component, inject } from "@angular/core"
import { ActivatedRoute, RouterLink } from "@angular/router"
import { CommonModule, Location } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { ShareButtonDirective } from "ngx-sharebuttons"

import {
    MARKED_OPTIONS,
    MarkdownModule,
    MarkdownService,
    MarkedOptions,
    MarkedRenderer,
    MermaidAPI
} from "ngx-markdown"
import { HttpClient } from "@angular/common/http"
import { BlogService } from "../../../core/service/blog/blog.service"

import { heroChevronLeft, heroChevronUp, heroCalendarDays } from "@ng-icons/heroicons/outline"
import { octRss, octMarkGithub, octMail } from "@ng-icons/octicons"
import { faBrandSquareTwitter, faBrandLinkedin } from "@ng-icons/font-awesome/brands"

import { blogs, links } from "../../../constants"

@Component({
    selector: "app-blog-detail",
    standalone: true,
    imports: [CommonModule, MarkdownModule, NgIconComponent, ShareButtonDirective],
    viewProviders: [
        provideIcons({
            heroChevronLeft,
            heroChevronUp,
            heroCalendarDays,
            octRss,
            octMarkGithub,
            octMail,
            faBrandSquareTwitter,
            faBrandLinkedin
        })
    ],
    templateUrl: "./blog-detail.component.html",
    styles: ``
})

export class BlogDetailComponent {
    route: ActivatedRoute = inject(ActivatedRoute)
    slug = ""
    postContent: string = ""
    icons = [faBrandSquareTwitter, octMail]
    socialLinks = links
        .map((v, i) => ({
            ...v,
            icon: this.icons[i]
        }))
        .slice(0, 2)

    blogpost: (typeof blogs)[number] | undefined
    blogServices = inject(BlogService)


    constructor(
        private http: HttpClient,
        private location: Location
    ) {
        this.slug = this.route.snapshot.params["slug"]

        this.blogServices.getBlogBySlug(this.slug).then(data=>{
            this.blogpost = data; 
        }).catch(error=> console.log)
        this.blogServices.getBlogDetail(this.slug).then(content=>{
            this.postContent  = content; 
        }).catch(error=> console.log(error))
    }

   

    trackByUrl(index: number, item: any): string {
        return item.url
    }


    formateDate(strDate: string =""): Date {
        return new Date(strDate)
    }

    goBack() {
        this.location.back()
    }
}
