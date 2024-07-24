import { Injectable } from "@angular/core"
import { blogs } from "../../../constants"
import { HttpClientModule, HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root"
})
export class BlogService {
    private blogList = blogs

    constructor(private http: HttpClient) {}

    async getAllBlogPost() {
        return this.blogList
    }

    async getBlogListByPage(page: number = 1) {
        return this.blogList.slice(0, 9)
    }

    async getBlogBySlug(slug: string): Promise<(typeof blogs)[number]> {
        return this.blogList[this.blogList.findIndex(v => v.slug == slug)]
    }

    async getBlogDetail(slug: string): Promise<string> {
        try {
            const content = await this.http
                .get(`/assets/${slug}.md`, {
                    responseType: "text"
                })
                .toPromise()
            alert(content)
            return content as string
        } catch (error) {
            return ""
        }
    }
}
