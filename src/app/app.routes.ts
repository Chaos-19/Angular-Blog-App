import { Routes } from "@angular/router"
import { HomeComponent } from "./features/home/home.component"
import { BlogComponent } from "./features/blog/blog.component"

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Home page"
    },
    {
        path: "/blogs",
        component: BlogComponent,
        title: "Blog Post page"
    }
]
