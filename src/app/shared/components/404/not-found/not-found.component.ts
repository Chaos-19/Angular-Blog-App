import { Component, inject } from "@angular/core"
import { RouterLink } from "@angular/router"
import { NavigationService } from "../../../../core/service/navigation/navigation.service"

@Component({
    selector: "app-not-found",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./not-found.component.html",
    styles: ``
})

export class NotFoundComponent {

    navigation = inject(NavigationService)

    goBack() {
        this.navigation.goBack()
    }
}
