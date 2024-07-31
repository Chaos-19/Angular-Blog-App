import { Component } from '@angular/core';
import {CommonModule} from "@angular/common"
import {FormControl,FormGroup,ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styles: ``
})
export class AddBlogComponent {

  addForm =new  FormGroup({
     title: new FormControl(""),
     description: new FormControl(""),
     content: new FormControl(""),
     tags: new FormControl("")
  })

  submitBlog(){

  }

}
