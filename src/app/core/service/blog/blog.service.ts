import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root"
})
export class BlogService {
    constructor() {}

    async getAllBlogPost() {}

    async getBlogListByPage(page: number) {}

    async getBlogBySlug(slug: string) {}

    async getBlogDetail(slug: string) {}
}
