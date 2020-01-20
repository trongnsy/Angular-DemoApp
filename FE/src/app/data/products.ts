import { IProduct } from './product';

export const products: IProduct[] =
[
    {
        name: 'Samsung Galaxy S10e',
        price: 549.99,
        instock: 10,
        description: 'This is a Samsung Galaxy S10e',
        imageSrc: 'assets/images/samsung_s10e_black.png'
    },
    {
        name: 'Samsung Galaxy S10',
        price: 499.99,
        instock: 12,
        description: 'This is a Samsung Galaxy S10',
        imageSrc: 'assets/images/samsung_s10_white.png'
    },
    {
        name: 'Samsung Galaxy Note 10',
        price: 629.99,
        instock: 0,
        description: 'This is a Samsung Galaxy Note 10',
        imageSrc: 'assets/images/samsung_note10_silver.jpg'
    },
    {
        name: 'iPhone 11 Black',
        price: 699.99,
        instock: 0,
        description: 'This is an iPhone 11 Black',
        imageSrc: 'assets/images/iphone_11_black.jpg'
    },
    {
        name: 'iPhone 11 Pro',
        price: 799.99,
        instock: 19,
        description: 'This is an iPhone 11 Pro',
        imageSrc: 'assets/images/iphone_11pro_darknight.png'
    },
    {
        name: 'iPhone 11 Silver',
        price: 699.99,
        instock: 20,
        description: 'This is an iPhone 11 Silver',
        imageSrc: 'assets/images/iphone_11_silver.png'
    }
];
