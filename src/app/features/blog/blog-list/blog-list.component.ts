import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { heroCalendarDays } from "@ng-icons/heroicons/outline"

@Component({
    selector: "app-blog-list",
    standalone: true,
    imports: [CommonModule, NgIconComponent],
    viewProviders: [provideIcons({ heroCalendarDays })],
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

    formateDate(strDate: string): Date {
        return new Date(strDate)
    }
}
