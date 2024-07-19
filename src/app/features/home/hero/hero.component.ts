import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { octRss, octMarkGithub, octMail } from "@ng-icons/octicons"
import { faBrandSquareTwitter, faBrandLinkedin } from "@ng-icons/font-awesome/brands"
import { heroParagraph, links } from "../../../constants"

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
    icons = [octMarkGithub, faBrandLinkedin, octMail, faBrandSquareTwitter]
    socialLinks = links.map((v, i) => ({
        ...v,
        icon: this.icons[i]
    }))

    trackByUrl(index: number, item: any): string {
        return item.url
    }
}
