"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Card,
  Divider,
  Grid,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ thêm dòng này

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter(); // ✅ khởi tạo router

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, item) => {
    const quantity = parseInt(item.quantity) || 0;
    const price = parseInt(item.price) || 0;
    return total + quantity * price;
  }, 0);

  const shippingFee = totalPrice > 500000 ? 0 : 50000;
  const finalTotal = totalPrice + shippingFee;

  const handleOrder = () => {
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")} // ✅ chuyển về trang chủ
          >
            Floral Haven
          </Typography>
          <IconButton onClick={() => router.push("/cart")}> {/* ✅ chuyển về giỏ hàng */}
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Checkout Content */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Left - Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Số điện thoại" margin="normal" />

            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Giao hàng
            </Typography>
            <TextField
              fullWidth
              label="Thành phố"
              value="Hồ Chí Minh"
              disabled
              margin="normal"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Họ" margin="normal" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Tên" margin="normal" />
              </Grid>
            </Grid>

            <TextField fullWidth label="Địa chỉ" margin="normal" />
            <TextField
              fullWidth
              label="Căn hộ, số tầng,... (tuỳ chọn)"
              margin="normal"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Lưu thông tin cho lần sau"
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Right - Order Summary */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Đơn hàng
              </Typography>

              {cart.map((item, index) => (
                <Box key={index} sx={{ display: "flex", mb: 2 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginRight: 12,
                    }}
                  />
                  <Box>
                    <Typography>{item.name}</Typography>
                    <Typography color="text.secondary">
                      x{item.quantity || 1}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto", fontWeight: 500 }}>
                    {(item.price * (item.quantity || 1)).toLocaleString()} VND
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Tạm tính:</Typography>
                <Typography>{totalPrice.toLocaleString()} VND</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography>Phí giao hàng:</Typography>
                <Typography>
                  {shippingFee === 0
                    ? "Miễn phí"
                    : `${shippingFee.toLocaleString()} VND`}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                <Typography>Tổng cộng:</Typography>
                <Typography color="#8bc34a">
                  {finalTotal.toLocaleString()} VND
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleOrder}
                sx={{ py: 1.5, backgroundColor: "#8bc34a" }}
              >
                ĐẶT HÀNG
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
