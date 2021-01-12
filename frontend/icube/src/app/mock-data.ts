import {Product} from './shared/models/product';
import {Category} from "./shared/enums/Category";
import {CartItem} from "./shared/models/cartItem";
import {Measurement} from "./shared/models/measurement";
import {Image} from "./shared/models/image";
import {Advertisement} from "./shared/models/advertisement";
import {ImageSlider} from "./shared/models/imageSlider";

export const products: Product[] = [
  {
    id: 1,
    code: 'B0001',
    urlName: 'arabic-coffee',
    mainImage: '../assets/images/coffee-1.jpg',
    name: 'Arabic coffee',
    description: 'Great coffee from I Cube eshop. Not sponsored by TUKE.',
    quantity: 50,
    price: 5,
    category: Category.ACCESSORIES,
    measurements: [],
    images: [
      new Image(1, 'name','../assets/images/coffee-1.jpg'),
      new Image(1, 'name','../assets/images/coffee-2.jpg'),
      new Image(1, 'name','../assets/images/coffee-3.jpg'),
      new Image(1, 'name','../assets/images/coffee-4.jpg')
    ]
  },
  {
    id: 2,
    code: 'A0002',
    urlName: 'tuke-cup',
    mainImage: '../assets/images/cup-1.jpg',
    name: 'Tuke cup',
    description: 'Great cup for endless and hard school tasks.',
    quantity: 35,
    price: 2,
    category: Category.WOMEN,
    measurements: [],
    images: [
      new Image(1, 'name', '../assets/images/cup-1.jpg'),
      new Image(1, 'name', '../assets/images/cup-2.jpg')
    ]
  },
  {
    id: 3,
    code: 'C0003',
    urlName: 'duck-to-bath',
    mainImage: '../assets/images/duck-1.jpg',
    name: 'Duck to bath',
    description: 'Padded, interactive inflatable bath makes big baths comfortable for kids.',
    quantity: 47,
    price: 3,
    category: Category.MEN,
    measurements: [
      new Measurement('small'),
      new Measurement('medium'),
      new Measurement('large')
    ],
    images: [
      new Image(1, 'name','../assets/images/duck-1.jpg'),
      new Image(1, 'name','../assets/images/duck-2.jpg'),
      new Image(1, 'name','../assets/images/duck-3.jpg')
    ]
  },
  {
    id: 4,
    code: 'C0043',
    urlName: 'superlite-hat',
    mainImage: '../assets/images/hat-1.jpg',
    name: 'Superlite hat',
    description: 'This men\'s training hat shades eyes, wicks sweat and ' +
      'offers UV protection for hot and sunny days ' +
      'spent outside the gym. It\'s made of featherweight Climalite, and ' +
      'features an under-visor that cuts down glare.\n' +
      '\n',
    quantity: 0,
    price: 24,
    category: Category.MEN,
    measurements: [
      new Measurement('small'),
      new Measurement('medium'),
      new Measurement('large')
    ],
    images: [
      new Image(1, 'name','../assets/images/hat-1.jpg'),
      new Image(1, 'name','../assets/images/hat-2.jpg'),
      new Image(1, 'name','../assets/images/hat-3.jpg'),
      new Image(1, 'name','../assets/images/hat-4.jpg')
    ]
  },
  {
    id: 5,
    code: 'D0873',
    urlName: 'shaped-long-tee',
    mainImage: '../assets/images/t-shirt-1.jpg',
    name: 'Shaped Long Tee',
    description: 'Carve a space for yourself. Unity is a queer skateboarding project based out of Oakland, California.',
    quantity: 35,
    price: 12.99,
    category: Category.WOMEN,
    measurements: [
      new Measurement('XS'),
      new Measurement('S'),
      new Measurement('M'),
      new Measurement('L'),
      new Measurement('XL'),
      new Measurement('XXL')
    ],
    images: [
      new Image(1, 'name', '../assets/images/t-shirt-1.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-2.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-3.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-4.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-5.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-6.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-7.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-8.jpg'),
      new Image(1, 'name', '../assets/images/t-shirt-2.jpg')
    ]
  },
  {
    id: 6,
    code: 'RU588',
    urlName: 'aurora-world-bear-10-5-coco-bear-brown',
    mainImage: '../assets/images/teddy-bear-1.jpg',
    name: 'Aurora World - Bear - 10.5" Coco Bear, Brown',
    description: 'Measures 10.5" tall.\n' +
      'Made with high quality materials and lock-washer eyes for safety.\n' +
      'Wears a beautiful red ribbon bow.',
    quantity: 36,
    price: 24,
    category: Category.ACCESSORIES,
    measurements: [
      new Measurement('small'),
      new Measurement('medium'),
      new Measurement('large')
    ],
    images: [
      new Image(1, 'name', '../assets/images/teddy-bear-1.jpg'),
      new Image(1, 'name', '../assets/images/teddy-bear-2.jpg')
    ]
  },
  {
    id: 7,
    code: 'RU470',
    urlName: '1-24-ferrari-enzo-ferrari-red',
    mainImage: '../assets/images/car-1.jpg',
    name: '1:24 FERRARI ENZO FERRARI RED',
    description: 'Metal model Ferrari car in scale 1:24.',
    quantity: 36,
    price: 24,
    category: Category.ACCESSORIES,
    measurements: [],
    images: [
      new Image(1, 'name', '../assets/images/car-1.jpg')
    ]
  },
  {
    id: 8,
    code: 'Z8752',
    urlName: 'small-foot-plysak-mimon-stuart',
    mainImage: '../assets/images/mimon-1.jpg',
    name: 'Small Foot Plyšák mimoň Stuart',
    description: 'They make children happy from an early age, they develop their tactile and sensory skills.',
    quantity: 47,
    price: 19.85,
    category: Category.ACCESSORIES,
    measurements: [],
    images: [
      new Image(1, 'name', '../assets/images/mimon-1.jpg')
    ]
  },
  {
    id: 9,
    code: 'PO470',
    urlName: 'dazdnik-tuke-1952',
    mainImage: '../assets/images/visualisations/_doplnky/dazdnik_TUKE-1952.jpg',
    name: 'Dáždnik TUKE-1952',
    description: 'Metal model Ferrari car in scale 1:24.',
    quantity: 36,
    price: 14,
    category: Category.ACCESSORIES,
    measurements: [
      new Measurement('small'),
      new Measurement('medium'),
      new Measurement('large')
    ],
    images: [
      new Image(1, 'name', '../assets/images/visualisations/_doplnky/dazdnik_TUKE-1952.jpg')
    ]
  },
  {
    id: 10,
    code: 'OU785',
    urlName: 'siltovka-front-TUKE-1952',
    mainImage: '../assets/images/visualisations/_doplnky/siltovka_front_TUKE-1952.jpg',
    name: 'Šiltovka TUKE 1952',
    description: 'Metal model Ferrari car in scale 1:24.',
    quantity: 36,
    price: 14,
    category: Category.ACCESSORIES,
    measurements: [],
    images: [
      new Image(1, 'name', '../assets/images/visualisations/_doplnky/siltovka_front_TUKE-1952.jpg'),
      new Image(1, 'name', '../assets/images/visualisations/_doplnky/siltovka_back_TUKE-1952.jpg')
    ]
  },
  {
    id: 11,
    code: 'RU870',
    urlName: 'biela-mikina-swirl-front',
    mainImage: '../assets/images/visualisations/_mikiny/biela-mikina_SWIRL_front.jpg',
    name: 'Biela mikina SWIRL',
    description: 'Metal model Ferrari car in scale 1:24.',
    quantity: 47,
    price: 24,
    category: Category.MEN,
    measurements: [
      new Measurement('XS'),
      new Measurement('S'),
      new Measurement('M'),
      new Measurement('L'),
      new Measurement('XL'),
      new Measurement('XXL')
    ],
    images: [
      new Image(1, 'name', '../assets/images/visualisations/_mikiny/biela-mikina_SWIRL_front.jpg'),
      new Image(2, 'name', '../assets/images/visualisations/_mikiny/biela-mikina_SWIRL_back.jpg')
    ]
  },
  {
    id: 12,
    code: 'PON89',
    urlName: 'ponozky-tuke',
    mainImage: '../assets/images/visualisations/_ponozky/ponozky_biele_sede-pozadie.jpg',
    name: 'Ponožky TUKE ',
    description: 'Metal model Ferrari car in scale 1:24.',
    quantity: 27,
    price: 14,
    category: Category.WOMEN,
    measurements: [
      new Measurement('XS'),
      new Measurement('S'),
      new Measurement('M'),
      new Measurement('L'),
      new Measurement('XL'),
      new Measurement('XXL')
    ],
    images: [
      new Image(1, 'name1', '../assets/images/visualisations/_ponozky/ponozky_biele_sede-pozadie.jpg'),
      new Image(1, 'name2', '../assets/images/visualisations/_ponozky/ponozky_biele_tmave-pozadie.jpg'),
      new Image(1, 'name3', '../assets/images/visualisations/_ponozky/ponozky_cierne_sede-pozadie.jpg')
    ]
  }
];

export const product: Product = {
  id: 1,
  code: 'B0001',
  urlName: 'arabic-coffee',
  mainImage: '../assets/images/coffee-1.jpg',
  name: 'Arabic coffee',
  description: 'Great coffee from I Cube eshop. Not sponsored by TUKE.',
  quantity: 50,
  price: 5,
  category: Category.ACCESSORIES,
  measurements: [],
  images: [
    new Image(1,'name', '../assets/images/coffee-1.jpg'),
    new Image(1,'name', '../assets/images/coffee-2.jpg'),
    new Image(1,'name', '../assets/images/coffee-3.jpg'),
    new Image(1,'name', '../assets/images/coffee-4.jpg')
  ]
};

export const cartItems: CartItem[] = [
  {
    product_id: 1,
    code: 'B0001',
    imageUrl: '../assets/images/coffee-1.jpg',
    name: 'Arabic coffee',
    quantity: 2,
    price: 5
  },
  {
    product_id: 2,
    code: 'A0002',
    imageUrl: '../assets/images/cup-1.jpg',
    name: 'Tuke cup',
    quantity: 1,
    price: 2
  },
  {
    product_id: 3,
    code: 'C0003',
    imageUrl: '../assets/images/duck-1.jpg',
    name: 'Duck to bath',
    quantity: 2,
    price: 3,
  },
  {
    product_id: 4,
    code: 'C0043',
    imageUrl: '../assets/images/hat-1.jpg',
    name: 'Superlite hat',
    quantity: 1,
    price: 24
  }
];

export const advertisement: Advertisement = {
  id: 1,
  image: new Image(1, 'advertisement', '../assets/images/landscape.jpg')
};

export const imageSlider: ImageSlider = {
  id: 1,
  interval: 3000,
  images: [
    new Image(1, 'imageSlider', '../assets/images/slider-1.jpg'),
    new Image(1, 'imageSlider', '../assets/images/slider-2.jpg'),
    new Image(1, 'imageSlider', '../assets/images/slider-3.jpg')
  ]
};
