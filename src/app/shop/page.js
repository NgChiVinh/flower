"use client";

import { Container, Grid } from "@mui/material";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart = [...cart];

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Added to cart:", product);
  };

  return (
    <>
      <Navbar cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} />
      <Container sx={{ mt: 12 }}>
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
