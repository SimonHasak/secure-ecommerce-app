export class Image {
  id: number;
  name: string;
  urlAddressOfImage: string;

  constructor(id: number, name: string, urlAddressOfImage: string) {
    this.id = id;
    this.name = name;
    this.urlAddressOfImage = urlAddressOfImage;
  }
}
