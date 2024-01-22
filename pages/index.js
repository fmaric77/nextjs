import { useEffect, useState } from 'react';
import Head from 'next/head'; // import the Head component

export default function Home() {
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState('');
    const [productType, setProductType] = useState('');
    const [productName, setProductName] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(
                `/api/products?brand=${brand}&product_type=${productType}&name=${productName}`
            );
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Head>
                <link rel="icon" href="/image.ico" type="image/x-icon" />
            </Head>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f8f8',
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
                }}
                className="header"
            >
                <h1>Product Search</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchProducts();
                    }}
                    style={{ display: 'flex', gap: '10px' }}
                >
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Brand"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    />
                    <input
                        type="text"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        placeholder="Product Type"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    />
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Name"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                        }}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gridAutoRows: 'auto',
                    gap: '10px',
                    padding: '20px',
                }}
                className="grid-container"
            >
                {products
                    .filter(product => product.price !== "0.0")
                    .map((product) => (
                        <div
                            key={product.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
                                transition: 'box-shadow 0.3s ease',
                            }}
                            className="grid-item"
                        >
                            <h2 style={{ fontSize: '1.2em', color: 'black' }}>{product.name}</h2>
                            <img
                                src={product.image_link}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                className="details"
                            >
                                <p>{product.brand}</p>
                                <p
                                    className="price"
                                    style={{ color: product.price === "0.0" ? 'red' : 'black' }}
                                >
                                    {product.price === "0.0" ? (
                                        <span>Out of Stock</span>
                                    ) : (
                                        `${product.price}€`
                                    )}
                                </p>
                                <p>{product.product_type}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}