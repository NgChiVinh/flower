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
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email không được để trống";
    if (!formData.phone) errors.phone = "Số điện thoại không được để trống";
    if (!formData.firstName) errors.firstName = "Họ không được để trống";
    if (!formData.lastName) errors.lastName = "Tên không được để trống";
    if (!formData.address) errors.address = "Địa chỉ không được để trống";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const totalPrice = cart.reduce((total, item) => {
    const quantity = parseInt(item.quantity) || 0;
    const price = parseInt(item.price) || 0;
    return total + quantity * price;
  }, 0);

  const shippingFee =
    shippingMethod === "pickup" || cart.length === 0
      ? 0
      : totalPrice > 500000
      ? 0
      : 50000;

  const finalTotal = totalPrice + shippingFee;

  const handleOrder = () => {
    if (cart.length === 0) {
      setFormErrors({ cart: "Không có sản phẩm nào trong giỏ hàng!" });
      return;
    }

    if (!validateForm()) return;

    const newOrder = {
      id: Date.now(),
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      shippingAddress: formData.address,
      products: cart.map((item) => ({
        product: item,
        quantity: item.quantity,
      })),
      totalAmount: finalTotal,
      shippingMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    localStorage.removeItem("cart");
    router.push("/orders");
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Floral Haven
          </Typography>
          <IconButton onClick={() => router.push("/cart")}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* LEFT: Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              name="phone"
              label="Số điện thoại"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="Họ"
                  fullWidth
                  margin="normal"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Tên"
                  fullWidth
                  margin="normal"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              name="address"
              label="Địa chỉ"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField fullWidth label="Thành phố" value="Hồ Chí Minh" disabled margin="normal" />

            <FormControl sx={{ mt: 2 }}>
              <FormLabel
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  "&.Mui-focused": { color: "black" },
                }}
              >
                Hình thức giao hàng
              </FormLabel>
              <RadioGroup
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
              >
                <FormControlLabel value="delivery" control={<Radio color="black"/>} label="Giao hàng tận nơi" />
                <FormControlLabel value="pickup" control={<Radio color="black" />} label="Khách hàng đến lấy" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* RIGHT: Summary */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Đơn hàng
              </Typography>

              {cart.length === 0 && (
                <Typography color="error" fontStyle="italic" mb={2}>
                  {formErrors.cart}
                </Typography>
              )}

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

              {cart.length > 0 && shippingMethod === "delivery" && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography>Phí giao hàng:</Typography>
                  <Typography>
                    {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()} VND`}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", mb: 2 }}
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
                Đặt hàng
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
