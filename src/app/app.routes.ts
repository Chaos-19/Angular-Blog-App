import { Routes } from "@angular/router"
import { HomeComponent } from "./features/home/home.component"
import { BlogComponent } from "./features/blog/blog.component"
import { BlogDetailComponent } from "./features/blog/blog-detail/blog-detail.component"
import { SearchComponent } from "./features/blog/search/search.component"
import { AddBlogComponent } from "./features/blog/add-blog/add-blog.component"
import { EditeBlogComponent } from "./features/blog/edite-blog/edite-blog.component"
import { BlogTemplateComponent } from "./shared/templates/blog-template/blog-template.component"

import { NotFoundComponent } from "./shared/components/404/not-found/not-found.component"

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Home page"
    },
    {
        path: "",
        component: BlogTemplateComponent,
        children: [
            {
                path: "blog",
                component: BlogComponent,
                title: "Blog Post page"
            },
            {
                path: "blog/:slug",
                component: BlogDetailComponent,
                title: "Blog Post page"
            },
            {
                path: "blog/add/",
                component: AddBlogComponent,
                title: "Add Blog Post page"
            },
            {
                path: "blog/edit/:slug",
                component: EditeBlogComponent,
                title: "Edite Blog Post page"
            },
            {
                path: "search",
                component: SearchComponent,
                title: "Blog Post search page"
            },
            {
                path: "404",
                component: NotFoundComponent,
                title: "404 Page Not Found page"
            },
            {
                path: "**",
                component: NotFoundComponent,
                title: "404 Page Not Found page"
            }
        ]
    }
]
