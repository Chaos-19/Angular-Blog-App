import { Component, inject } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

@Component({
    selector: "app-edite-blog",
    standalone: true,
    imports: [],
    templateUrl: "./edite-blog.component.html",
    styles: ``
})
export class EditeBlogComponent {
    route: ActivatedRoute = inject(ActivatedRoute)
    slug = ""

    constructor() {
        this.slug = this.route.snapshot.params["slug"]
    }
}
