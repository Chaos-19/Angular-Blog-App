import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './hero/hero.component';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { BlogService } from '../../core/service/blog/blog.service';

import type { blogs } from '../../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, BlogListComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  blogList: typeof blogs = [];
  blogService = inject(BlogService);

  constructor() {
    this.blogService
      .getAllBlogPost()
      .then((posts) => (this.blogList = posts))
      .catch((error) => console.log(error));
  }
}
