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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // Basic validation
    if (!name || !email || !phone || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    console.log("Tên:", name);
    console.log("Email:", email);
    console.log("SĐT:", phone);
    console.log("Mật khẩu:", password);

    // 👉 Gọi API thực tế ở đây nếu có

    // Điều hướng sau khi đăng ký
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
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 4, backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.9)" }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="#546e7a">
            Đăng ký tài khoản
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mt={2}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <TextField
              label="Họ và tên"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="secondary" fullWidth onClick={handleRegister}>
              Đăng ký
            </Button>

            <Typography textAlign="center">
              Đã có tài khoản?{" "}
              <Button color="secondary" onClick={() => router.push("/auth/login")} sx={{ textTransform: "none" }}>
                Đăng nhập
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
