import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BlogService } from '../../core/service/blog/blog.service';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleRight,

} from '@ng-icons/heroicons/outline';

import { BlogListComponent } from './blog-list/blog-list.component';
import { blogs } from '../../constants';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, BlogListComponent],
  viewProviders: [provideIcons({ heroChevronDoubleRight })],
  templateUrl: './blog.component.html',
  styles: ``,
})
export class BlogComponent {
  blogList: typeof blogs = [];
  allTags: string[] = [];

  blogService = inject(BlogService);

  constructor() {
    this.blogService.getAllBlogPost().then((res) => (this.blogList = res));
    this.blogService.getAllPostTags().then((tags) => (this.allTags = tags));
  }
}
