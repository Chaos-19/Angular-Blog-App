import { Routes } from "@angular/router"
import { HomeComponent } from "./features/home/home.component"
import { BlogComponent } from "./features/blog/blog.component"
import { SearchComponent } from "./features/blog/search/search.component"

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Home page"
    },
    {
        path: "blogs",
        component: BlogComponent,
        title: "Blog Post page"
    },
    {
        path: "search",
        component: SearchComponent,
        title: "Blog Post search page"
    }
]
