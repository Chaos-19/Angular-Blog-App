import { Injectable } from "@angular/core"
import { blogs } from "../../../constants"
import {  HttpClient } from "@angular/common/http"

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
        return this.blogList[this.blogList.findIndex(v => v.slug === slug)]
    }

    async getBlogDetail(slug: string): Promise<string> {
        try {

            const content = await this.http
                .get(`/assets/${slug}.md`, {
                    responseType: "text"
                })
                .toPromise()
           
            return content as string
        } catch (error) {
            return ""
        }
    }

    async getAllPostTags():Promise<string[]>{
        return blogs
        .reduce((prev: string[], blog: (typeof blogs)[number]) => [...blog.tags, ...prev], [])
        .reduce(
            (prev: string[], current:string) => (prev.includes(current) ? prev : [current, ...prev]),
            []
        )
    }

    async submitPost(blog: typeof blogs[number]){
       console.log("blog");
       console.log(blog);

       this.blogList.push(blog)
    }
}
