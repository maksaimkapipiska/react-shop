import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from './components/Header.jsx';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartDropdown from "./components/CartDropdown.jsx";

const defaultCartItems = localStorage.getItem('cartItems'); // достаем defaultCartItems за компонентом, чтоб этот код выполнился один раз

function App() {
    const [cartItems, setCartItems] = useState( // передаем defaultCartItems в default value у useState
        defaultCartItems
            ? JSON.parse(defaultCartItems)
            : []
    ) ;
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 2;

    useEffect(() => {
        const cartItemsJSON = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', cartItemsJSON);
    }, [cartItems]); // каждый раз как cartItems изменяеться добавляем все cartItems в localStorage

    const addToCart = (product) => {
        setCartItems(prev => {
            const found = prev.find(item => item.id === product.id);
            if (found) {
                // увеличиваем количество
                return prev.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            // если товара нет, добавляем
            return [...prev, {...product, quantity: 1}];
        });
    };

// Удалить товар из корзины
    const delFromCart = (productId) => {
        setCartItems(prev => {
            return prev
                .map(item =>
                    item.id === productId
                        ? {...item, quantity: item.quantity - 1}
                        : item
                )
                .filter(item => item.quantity > 0); // убираем, если 0
        });
    };


    const products = [
        {
            id: 1,
            title: 'Ноутбук ASUS',
            description: 'Мощный ноутбук для работы и игр.',
            image: 'https://dlcdnwebimgs.asus.com/gain/30B02883-1847-4CA8-80AC-393A69BB7CD2/w185/fwebp',
            price: 999
        },
        {
            id: 2,
            title: 'iPhone 13',
            description: 'Смартфон нового поколения.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Uj8AXe__BKzgfJeCwtFpdrwG3Eu8lgl4oA&s',
            price: 799
        },
        {
            id: 3,
            title: 'Наушники Sony',
            description: 'Захватывающий звук.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEdiwXWypRdv-veXAUlYQlST5cB51x-jSYw&s',
            price: 199
        },
        {
            id: 4,
            title: 'Наушники Sony',
            description: 'Захватывающий звук.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEdiwXWypRdv-veXAUlYQlST5cB51x-jSYw&s',
            price: 199
        },
        {
            id: 5,
            title: 'iPhone 13',
            description: 'Смартфон нового поколения.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Uj8AXe__BKzgfJeCwtFpdrwG3Eu8lgl4oA&s',
            price: 799
        },
        {
            id: 6,
            title: 'Наушники Sony',
            description: 'Захватывающий звук.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEdiwXWypRdv-veXAUlYQlST5cB51x-jSYw&s',
            price: 199
        },
        {
            id: 7,
            title: 'iPhone 13',
            description: 'Смартфон нового поколения.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Uj8AXe__BKzgfJeCwtFpdrwG3Eu8lgl4oA&s',
            price: 799
        },
        {
            id: 8,
            title: 'Наушники Sony',
            description: 'Захватывающий звук.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEdiwXWypRdv-veXAUlYQlST5cB51x-jSYw&s',
            price: 199
        }
    ];

    const currentProducts = useMemo(() => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        return products.slice(indexOfFirstProduct, indexOfLastProduct);
    }, [currentPage]);

    const totalPages = (products.length + productsPerPage - 1) / productsPerPage | 0;

    return (
        <div className="App" style={{height: '100vh'}}>
            <Header cartItems={cartItems} addToCart={addToCart} delFromCart={delFromCart}/>

            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px'}}>
                {currentProducts.map(product => (
                    <Card key={product.id} style={{width: '18rem'}}>
                        <Card.Img variant="top" src={product.image}/>
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Button className="addToCart" onClick={() => addToCart(product)}>
                                Купить за {product.price}$
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        {Array.from({length: totalPages}).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage}
                                             onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default App;
