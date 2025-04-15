"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { products } from "@/data/products";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = storedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += quantity;
    } else {
      storedCart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    const total = storedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  };

  if (!product) {
    return (
      <>
        <Box sx={{ borderBottom: "2px solid #ddd" }}>
          <Navbar cartCount={cartCount} />
        </Box>
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h5" color="error">Sản phẩm không tồn tại</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: "2px solid #ddd" }}>
        <Navbar cartCount={cartCount} />
      </Box>

      <Container sx={{ mt: 5 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
            Trang chủ
          </Link>
          <Link href="/shop" color="inherit" style={{ textDecoration: "none" }}>
            Cửa hàng
          </Link>
          <Typography color="textPrimary">{product.name}</Typography>
        </Breadcrumbs>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <Box flex={0.75}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              style={{
                objectFit: "cover",
                width: "100%",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Box>

          <Box flex={1}>
            <Typography variant="h4" fontWeight="bold">
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ my: 1, mb: 4 }}>
              {product.description}
            </Typography>

            <Typography variant="h5" color="black">
              {product.price.toLocaleString()} VND
            </Typography>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontWeight="bold">Số lượng:</Typography>
                <IconButton onClick={() => handleQuantityChange("decrease")}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange("increase")}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography variant="h6" fontWeight="bold" color="error">
                {(product.price * quantity).toLocaleString()} VND
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "100%", fontWeight: "bold" }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
