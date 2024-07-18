import { Component, inject } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import {
    MARKED_OPTIONS,
    MarkdownModule,
    MarkdownService,
    MarkedOptions,
    MarkedRenderer,
    MermaidAPI
} from "ngx-markdown"

@Component({
    selector: "app-blog-detail",
    standalone: true,
    imports: [MarkdownModule],
    templateUrl: "./blog-detail.component.html",
    styles: ``
})
export class BlogDetailComponent {
    route: ActivatedRoute = inject(ActivatedRoute)
    slug = ""
    postContent = `## Markdown __rulez__! 
---
### Syntax highlight 
TypeScript code snippet using syntax highlight 
\`\`\`typescript 
const language = 'typescript'; 
\`\`\`
\`\`\`javascript 
import './polyfills';
import { enableProdMode } from '@angular/core'; 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule).then(ref => { 
// Ensure Angular destroys itself on hot reloads. 
if (window['ngRef']) { 
window['ngRef'].destroy(); 
} 
window['ngRef'] = ref;
// Otherwise, log the boot error 
}).catch(err => console.error(err)); 

\`\`\` 
\`\`\`css 
.variable-binding, 
.variable-textarea { 
width: 49%; 
}
.variable-textarea { 
min-height: 420px; 
padding: 8px; 
}
.variable-binding {
display: block; 
float: right; 
} 
\`\`\` 
\`\`\`html 
<h5> 
angular@{{ angularVersion }} | ngx-markdown@{{ ngxMarkdownVersion }} 
</h5> 
<br>
<div markdown ngPreserveWhitespaces>{{ markdown }}</div> 
<!-- <div markdown [data]="markdown"></div> --> 

\`\`\` 

### Lists 
1. Ordered list 
2. Another bullet point 
- Unordered list 
- Another unordered bullet point
### Blockquote 
> Blockquote to the max!!!`

    constructor() {
        this.slug = this.route.snapshot.params["slug"]
    }
}
