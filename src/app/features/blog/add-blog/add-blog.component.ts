import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../../core/service/blog/blog.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styles: ``,
})
export class AddBlogComponent {

  blogService = inject(BlogService)
  addPostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tags: new FormControl(''),
  });

  submitBlog() {
    const post = {
      title: this.addPostForm.value.title ?? "",
      description: this.addPostForm.value.description ?? "",
      content: this.addPostForm.value.content ?? "",
      tags: this.addPostForm.value.tags?.split(" ") ?? [],
      pubDatetime: new Date().toString(),
      slug: this.addPostForm.value.title ?? ""
    };

    console.log(post);
    this.blogService.submitPost(post)
    
  }

}
