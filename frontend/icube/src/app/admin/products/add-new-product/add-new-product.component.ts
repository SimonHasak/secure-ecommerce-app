import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCreateDTO} from "../../shared/model/productCreateDTO";
import {AdminBannersService} from "../../shared/service/admin-banners.service";
import {AdminProductService} from "../../shared/service/admin-product.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  form: FormGroup;

  isLoading = false;
  isSubmitted = false;

  categoriesList: any[] = [];
  measurementsList: any[] = [];
  labelsList: any[] = [];

  parameterId: number = 0;
  isEdit: boolean = false;

  imagesList: string[] = ['dog', 'dog1', 'dog2', 'dog3'];

  constructor(private location: Location,
              private route: ActivatedRoute,
              private adminBannersService: AdminBannersService,
              private adminProductService: AdminProductService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initRoute();

    this.initForm();

    this.fetchLabels();
    this.fetchCategories();
    this.fetchMeasurements();
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      urlName: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.pattern('[0-9 ]*')]),
      quantity: new FormControl(0, [Validators.required, Validators.pattern('[0-9 ]*')]),
      visibleLabel: new FormControl('', Validators.required),
      mainImage: new FormControl('https://cdn.shopify.com/s/files/1/0697/7289/products/Roll_Top_Backpack_-_mustard_1200x.jpg?v=1580231062', Validators.required),
      categories: new FormControl('', Validators.required),
      measurements: new FormControl('', Validators.required),
      labels: new FormControl('', Validators.required),
      images: new FormArray([new FormControl('', Validators.required)])
    });
  }

  initRoute() {
    this.route.params.subscribe(params => {

      if (params) {
        if (params['id'] != undefined) {
          this.parameterId = parseInt(params['id'], 10);
          this.isEdit = true;
          this.fetchProductData(this.parameterId);
        }
      }

    });
  }

  fetchLabels() {
    this.adminBannersService.getAllLabels().subscribe(labels => {
      if (labels) {
        this.labelsList = labels;
      }
    });
  }

  fetchCategories() {
    this.adminBannersService.getAllCategories().subscribe(categories => {
      if (categories) {
        this.categoriesList = categories;
      }
    });
  }

  fetchMeasurements() {
    this.adminBannersService.getAllMeasurements().subscribe(measurements => {
      if (measurements) {
        this.measurementsList = measurements;
      }
    });
  }

  fetchProductData(id: number) {
    this.adminProductService.getProduct(id).subscribe(product => {
      if (product) {
        console.log(product);
        this.populateProductForm(product);
      }
    });
  }

  populateProductForm(product: ProductCreateDTO){
    // this.form.setValue(product);

    this.form.get('code').setValue(product.code);
    this.form.get('name').setValue(product.name);
    this.form.get('description').setValue(product.description);
    this.form.get('urlName').setValue(product.urlName);
    this.form.get('price').setValue(product.price);
    this.form.get('quantity').setValue(product.quantity);
    this.form.get('visibleLabel').setValue(product.visibleLabel);
    this.form.get('mainImage').setValue(product.mainImage);
    this.form.get('categories').setValue(product.categories);
    this.form.get('measurements').setValue(product.measurements);
    this.form.get('labels').setValue(product.labels);

    product.images.forEach(img => this.addImage(img));
    this.removeAt(0);

  }

  onSubmit() {
    if (this.form.invalid || this.isLoading || this.isSubmitted) return;

    this.isSubmitted = true;
    this.isLoading = true;

    const productCreateDTO = this.getProductCreateDTOData()

    console.log(productCreateDTO);

    if (!this.isEdit) {
      this.adminProductService.createProduct(productCreateDTO).subscribe(savedProduct => {
          if (savedProduct) {
            console.log(savedProduct);
            this.notificationService.showSuccess('Product was successfully saved!');
            this.onClear();
          }
        },
        err => {
          this.notificationService.showError('The same product is already in the database!');
          this.isLoading = false;
          this.isSubmitted = false;
        }
      );
    } else {
      this.adminProductService.updateProduct(this.parameterId, productCreateDTO).subscribe(savedProduct => {
        if (savedProduct) {
          console.log(savedProduct);
          this.notificationService.showSuccess('Product was successfully updated!');
          this.onClear();
        }
      },
        err => {
          this.notificationService.showError('Error with product updating!');
          this.isLoading = false;
          this.isSubmitted = false;
        })
    }


  }

  generateUrlName() {
    this.form.controls.urlName.setValue('url-product-name');
  }

  onClear() {
    this.form.reset();
    this.isSubmitted = false;
    this.isLoading = false;
  }

  goBackToProducts() {
    this.location.back();
  }

  removeAt(i: number) {
    let array = this.form.get('images') as FormArray;

    if (i == 0 && array.length <= 1) {
      array.get(i.toString(10)).setValue('');
    } else {
      array.removeAt(i);
    }
  }

  addImage(image = '') {
    let array = this.form.get('images') as FormArray;
    array.push(new FormControl(image, Validators.required));

  }

  getProductCreateDTOData(): ProductCreateDTO {
    return {
      code: this.f.code.value,
      name: this.f.name.value,
      description: this.f.description.value,
      urlName: this.f.urlName.value,
      price: this.f.price.value,
      quantity: this.f.quantity.value,
      visibleLabel: this.f.visibleLabel.value,
      mainImage: this.f.mainImage.value,
      categories: this.f.categories.value,
      measurements: this.f.measurements.value,
      labels: this.f.labels.value,
      images: this.f.images.value
    }
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.id == idSecond.id;
  }

  get fa() {
    return this.form.get('images') as FormArray;
  }

  get f() {
    // console.log(this.form.get('labels').value[0]);
    // console.log(this.form.value['labels']);
    return this.form.controls;
  }

}
