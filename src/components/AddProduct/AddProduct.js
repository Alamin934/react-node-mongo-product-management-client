import React, { useRef } from 'react';

const AddProduct = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();

    const handleAddProduct = e => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const quantity = quantityRef.current.value;

        const newProduct = { name, price, quantity };

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Product Added SuccessFully');
                    e.target.reset();
                }
            })

        e.preventDefault();
    }

    return (
        <div>
            <h2>This is Add Product Page</h2>
            <form onSubmit={handleAddProduct}>
                {/* product Name */}
                <div>
                    <input type="text" placeholder="Product Name" ref={nameRef} />
                </div>
                {/* product Price */}
                <div>
                    <input type="text" placeholder="Price" ref={priceRef} />
                </div>
                {/* product Quantity */}
                <div>
                    <input type="text" placeholder="Quantity" ref={quantityRef} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddProduct;