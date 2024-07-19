import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { heroCalendarDays, heroChevronDoubleRight } from "@ng-icons/heroicons/outline"

@Component({
    selector: "app-blog-list",
    standalone: true,
    imports: [CommonModule, RouterLink, NgIconComponent],
    viewProviders: [provideIcons({ heroCalendarDays, heroChevronDoubleRight })],
    templateUrl: "./blog-list.component.html",
    styles: ``
})
export class BlogListComponent {
    @Input() blogpost!: {
        pubDatetime: string
        title: string
        slug: string
        tags: string[]
        description: string
    }

    allTags = []

    formateDate(strDate: string): Date {
        return new Date(strDate)
    }
}
