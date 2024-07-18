import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeBlogComponent } from './edite-blog.component';

describe('EditeBlogComponent', () => {
  let component: EditeBlogComponent;
  let fixture: ComponentFixture<EditeBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
