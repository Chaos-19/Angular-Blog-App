import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

import { FooterComponent } from "../../components/footer/footer.component"

@Component({
    selector: "app-blog-template",
    standalone: true,
    imports: [RouterOutlet, FooterComponent],
    templateUrl: "./blog-template.component.html",
    styles: ``
})
export class BlogTemplateComponent {}
