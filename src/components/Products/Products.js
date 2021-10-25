import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleDeleteProduct = (id) => {
        const proceed = window.confirm('Are you sure, You want to delete this Product?');
        if (proceed) {
            const url = `http://localhost:5000/products/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Product Deleted Successfully');
                        const remainingProduct = products.filter(product => product._id !== id);
                        setProducts(remainingProduct);
                    }
                })
        }
    }

    return (
        <div>
            <h2>This is Products Page</h2>
            <div>
                <div className="card">
                    {
                        products.map(product => <div
                            key={product._id}
                            className="card-details"
                        >
                            <h4>Product Name: {product.name}</h4>
                            <p> <small>Price: ${product.price}</small> </p>
                            <p><small>Quantity: {product.quantity}</small></p>
                            <div>
                                <Link to={`products/update/${product._id}`}><button>Update</button></Link>
                                <button onClick={() => handleDeleteProduct(product._id)}>X</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;