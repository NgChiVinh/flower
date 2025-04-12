"use client";

import { Container, Grid } from "@mui/material";
import Navbar from "@/components/Navbar"; 
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products"; // Đảm bảo đường dẫn đúng
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage khi trang được tải
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật giỏ hàng trong localStorage
    console.log("Added to cart:", product);
  };

  return (
    <>
      <Navbar cartCount={cart.length} /> {/* Hiển thị số lượng giỏ hàng */}
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={6} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
