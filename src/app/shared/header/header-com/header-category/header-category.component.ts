import { Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import category_data from '@/data/category-data';
import { TypeMarcaModelService } from '../../../services/typemarcmodel.service';
import { TypeMarcModel } from '@/types/typemarcmodel.interface';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.scss']
})
export class HeaderCategoryComponent   {

  public categoryItems: any[] = []
  public isActive: boolean = false;

  constructor(private router: Router, private readonly typeMarcaModelService: TypeMarcaModelService) { }

  public getAll(): void {
    this.typeMarcaModelService.getAll().subscribe(res => {
      this.categoryItems = res.slice(0,5)
    })
  }

  public handleActive(): void {
    this.isActive = !this.isActive;
    console.log("me dispare",this.isActive)
    if(this.isActive) this.getAll()
  }

  public handleParentCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/shop'], { queryParams: { type: newCategory } });
  }

  public handleSubCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/shop'], { queryParams: { marca: newCategory } });
  }
}
