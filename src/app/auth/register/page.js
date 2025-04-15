"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Vui lòng nhập họ tên.";
    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email.";
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      errors.email = "Email không hợp lệ.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!formData.password) {
      errors.password = "Vui lòng nhập mật khẩu.";
    } else if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải từ 6 ký tự.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    console.log("Đăng ký:", formData);
    alert("Đăng ký thành công!");
    router.push("/auth/login");
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/images/login.jpg")',
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="#546e7a"
          >
            Đăng ký tài khoản
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <TextField
              name="name"
              label="Họ và tên"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              name="phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
            <TextField
              name="password"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleRegister}
            >
              Đăng ký
            </Button>

            <Typography textAlign="center">
              Đã có tài khoản?{" "}
              <Button
                color="secondary"
                onClick={() => router.push("/auth/login")}
                sx={{ textTransform: "none" }}
              >
                Đăng nhập
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
