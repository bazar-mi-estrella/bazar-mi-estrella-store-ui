import { Component, OnInit } from '@angular/core';
import { TypeMarcaModelService } from '../../../services/typemarcmodel.service';
import { TypeMarcModel } from '@/types/typemarcmodel.interface';

@Component({
  selector: 'app-electronic-category',
  templateUrl: './electronic-category.component.html',
  styleUrls: ['./electronic-category.component.scss']
})
export class ElectronicCategoryComponent implements OnInit {


  public category_items: TypeMarcModel[] = []

  constructor(private readonly typeMarcaModelService: TypeMarcaModelService) { }

  ngOnInit(): void {
    this.typeMarcaModelService.getAllTypes().subscribe((res) => {
      this.category_items = res.slice(0,5)
    })
  }
}
