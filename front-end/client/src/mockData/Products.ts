import Icon from '../assets/genres/biography.jpeg'
import { Product } from '../types/Products'

export const onRemoveProductMock = (productId: string) => {
    console.log(`Product with id ${productId} has been removed from the cart.`);
}

export const products: Product[] = [
    {
        id: '1',
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        img: Icon,
        price: 10,
        quantity: 5,
        discountRate: 0,
        genres: ['Tiểu thuyết', 'Lãng mạn'],
    },
    {
        id: '2',
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        img: Icon,
        price: 12,
        quantity: 7,
        discountRate: 0.1,
        genres: ['Tiểu thuyết'],
    },
    {
        id: '3',
        name: '1984',
        author: 'George Orwell',
        img: Icon,
        price: 8,
        quantity: 3,
        discountRate: 0,
        genres: ['Khoa học viễn tưởng', 'Trinh thám'],
    },
    {
        id: '4',
        name: 'Brave New World',
        author: 'Aldous Huxley',
        img: Icon,
        price: 9,
        quantity: 2,
        discountRate: 0,
        genres: ['Khoa học viễn tưởng'],
    },
    {
        id: '5',
        name: 'The Da Vinci Code',
        author: 'Dan Brown',
        img: Icon,
        price: 14,
        quantity: 10,
        discountRate: 0.2,
        genres: ['Huyền bí', 'Trinh thám'],
    },
    {
        id: '6',
        name: 'The Notebook',
        author: 'Nicholas Sparks',
        img: Icon,
        price: 11,
        quantity: 4,
        discountRate: 0,
        genres: ['Lãng mạn'],
    },
    {
        id: '7',
        name: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        img: Icon,
        price: 20,
        quantity: 3,
        discountRate: 0,
        genres: ['Fantasy'],
    },
    {
        id: '8',
        name: 'The Silence of the Lambs',
        author: 'Thomas Harris',
        img: Icon,
        price: 13,
        quantity: 1,
        discountRate: 0,
        genres: ['Trinh thám', 'Kinh dị'],
    },
];