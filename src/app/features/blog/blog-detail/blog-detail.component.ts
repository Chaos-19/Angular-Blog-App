import { Component, inject, OnInit } from "@angular/core"
import { ActivatedRoute, RouterLink } from "@angular/router"
import { CommonModule, Location } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import {
    MARKED_OPTIONS,
    MarkdownModule,
    MarkdownService,
    MarkedOptions,
    MarkedRenderer,
    MermaidAPI
} from "ngx-markdown"
import { HttpClientModule, HttpClient } from "@angular/common/http"
import { heroChevronLeft, heroChevronUp, heroCalendarDays } from "@ng-icons/heroicons/outline"
import { octRss, octMarkGithub, octMail } from "@ng-icons/octicons"
import { faBrandSquareTwitter, faBrandLinkedin } from "@ng-icons/font-awesome/brands"

import { blogs, links } from "../../../constants"

@Component({
    selector: "app-blog-detail",
    standalone: true,
    imports: [CommonModule, MarkdownModule, NgIconComponent, HttpClientModule],
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
export class BlogDetailComponent implements OnInit {
    route: ActivatedRoute = inject(ActivatedRoute)
    slug = ""
    postContent: any
    icons = [faBrandSquareTwitter, octMail]
    socialLinks = links
        .map((v, i) => ({
            ...v,
            icon: this.icons[i]
        }))
        .slice(0, 2)

    blogpost: (typeof blogs)[number]

    constructor(
        private http: HttpClient,
        private location: Location
    ) {
        this.slug = this.route.snapshot.params["slug"]
        this.blogpost = blogs[blogs.findIndex(v => v.slug == this.slug)]
    }

    async ngOnInit() {
        try {
            this.postContent = await this.http
                .get(`/assets/blogs/write-your-own-json-parser.md`, {
                    responseType: "text"
                })
                .toPromise()
        } catch (error) {
            console.log(error)
        }
    }
    trackByUrl(index: number, item: any): string {
        return item.url
    }

    formate(): string {
        return this.postContent?.split("---")[2]
    }
    formateDate(strDate: string): Date {
        return new Date(strDate)
    }

    goBack() {
        this.location.back()
    }
}
