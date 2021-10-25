import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);

    const handleNameChange = (e) => {
        const updatedName = e.target.value;
        const updatedProduct = { name: updatedName, price: product.price, quantity: product.quantity };
        setProduct(updatedProduct);
    }
    const handlePriceChange = (e) => {
        const updatedPrice = e.target.value;
        const updatedProduct = { ...product };
        updatedProduct.price = updatedPrice;
        setProduct(updatedProduct);
    }
    const handleQuantityChange = (e) => {
        const updatedQuantity = e.target.value;
        const updatedProduct = { ...product };
        updatedProduct.quantity = updatedQuantity;
        setProduct(updatedProduct);
    }

    const handleUpdateProduct = (e) => {
        const url = `http://localhost:5000/products/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Product Updated Successfully');

                }
            })

        e.preventDefault();
    }

    return (
        <div>
            <h2>This Product Update Page</h2>
            <h4>Update: {product.name} : {product.price} : {product.quantity} </h4>
            <h6>{id}</h6>
            <form onSubmit={handleUpdateProduct}>
                {/* product Name */}
                <div>
                    <input type="text" value={product.name || ''} onChange={handleNameChange} />
                </div>
                {/* product Price */}
                <div>
                    <input type="text" value={product.price || ''} onChange={handlePriceChange} />
                </div>
                {/* product Quantity */}
                <div>
                    <input type="text" value={product.quantity || ''} onChange={handleQuantityChange} />
                </div>
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateProduct;