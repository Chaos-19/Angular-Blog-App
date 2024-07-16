import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octRss, octMarkGithub, octMail } from "@ng-icons/octicons"
import { faBrandSquareTwitter, faBrandLinkedin } from "@ng-icons/font-awesome/brands"
import { heroParagraph } from "../../../constants"

@Component({
    selector: "app-hero",
    standalone: true,
    imports: [CommonModule, NgIconComponent],
    viewProviders: [
        provideIcons({ octRss, octMarkGithub, octMail, faBrandSquareTwitter, faBrandLinkedin })
    ],
    templateUrl: "./hero.component.html",
    styles: ``
})
export class HeroComponent {
    title = "kal"
    heroText = heroParagraph

    socialLinks = [
        {
            icon: octMarkGithub,
            url: "/chaos-19"
        },
        {
            icon: faBrandLinkedin,
            url: "/linkin"
        },
        {
            icon: octMail,
            url: "mailto:kalgetachew375@gmail.com?subject=feedback"
        },
        {
            icon: faBrandSquareTwitter,
            url: "/twitter"
        }
    ]

    trackByUrl(index: number, item: any): string {
        return item.url
    }
}
