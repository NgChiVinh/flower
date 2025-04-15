"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categories = [
  { label: "Tất cả", value: "all" },
  { label: "Tình yêu", value: "love" },
  { label: "Ngày đặc biệt", value: "birthday" },
  { label: "Chúc mừng rạng rỡ", value: "congrats" },
];

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("love");
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    let updated = products;

    if (query) {
      updated = updated.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      updated = updated.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(updated);
  }, [query, selectedCategory]);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart = [...cart];

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity =
        (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Box sx={{ borderBottom: "2px solid #ddd" }}>
        <Navbar cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} />
      </Box>

      <Container sx={{ mt: 12, mb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ fontFamily: "'Playfair Display', serif", mb: 4 }}
        >
          Danh Mục Sản Phẩm
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mb: 6,
            flexWrap: "wrap",       
          }}
        >
          {categories.map((cat) => (
              <Box
                key={cat.value}
                sx={{
                cursor: "pointer",
                fontWeight: selectedCategory === cat.value ? "bold" : "normal",
                fontSize: "1.2rem",
                borderBottom:
                  selectedCategory === cat.value
                    ? "2px solid black"
                    : "2px solid transparent",
                pb: 0.5,
                transition: "all 0.3s",
              }}
              onClick={() => setSelectedCategory(cat.value)}
              >
              {cat.label}
              </Box>
              ))}
              </Box>

        {query && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Kết quả tìm kiếm cho: "<strong>{query}</strong>"
          </Typography>
        )}

        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ mt: 4 }}>
              Không tìm thấy sản phẩm nào phù hợp.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
