import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ShareButtonDirective } from 'ngx-sharebuttons';

import {
  MARKED_OPTIONS,
  MarkdownModule,
  MarkdownService,
  MarkedOptions,
  MarkedRenderer,
  MermaidAPI,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../../core/service/blog/blog.service';
import { NavigationService } from '../../../core/service/navigation/navigation.service';

import {
  heroChevronLeft,
  heroChevronUp,
  heroCalendarDays,
} from '@ng-icons/heroicons/outline';
import { octRss, octMarkGithub, octMail } from '@ng-icons/octicons';
import {
  faBrandSquareTwitter,
  faBrandLinkedin,
} from '@ng-icons/font-awesome/brands';

import { blogs, links } from '../../../constants';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    NgIconComponent,
    ShareButtonDirective,
  ],
  viewProviders: [
    provideIcons({
      heroChevronLeft,
      heroChevronUp,
      heroCalendarDays,
      octRss,
      octMarkGithub,
      octMail,
      faBrandSquareTwitter,
      faBrandLinkedin,
    }),
  ],
  templateUrl: './blog-detail.component.html',
  styles: ``,
})
export class BlogDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  slug = '';
  postContent: string = '';
  icons = [faBrandSquareTwitter, octMail];
  socialLinks = links
    .map((v, i) => ({
      ...v,
      icon: this.icons[i],
    }))
    .slice(0, 2);

  blogpost: (typeof blogs)[number] | undefined;
  blogServices = inject(BlogService);
  navigation = inject(NavigationService)

  constructor(
    private http: HttpClient,
    private router: Router,
    
  ) {
    this.slug = this.route.snapshot.params['slug'];
    console.log(this.slug);

    this.blogServices
      .getBlogBySlug(this.slug)
      .then((data) => {
       if(!data)
        router.navigate(['/',"/404"])

        this.blogpost = data;
      })
      .catch((error) => console.log);
    this.blogServices
      .getBlogDetail(this.slug)
      .then((content) => {
        this.postContent = content;
      })
      .catch((error) => console.log(error));
  }

  trackByUrl(index: number, item: any): string {
    return item.url;
  }

  formateDate(strDate: string = ''): Date {
    return new Date(strDate);
  }

  goBack() {
    this.navigation.goBack();
  }
}
