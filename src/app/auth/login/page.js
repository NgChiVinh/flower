"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container } from "@mui/material";
import InputField from "@/components/ui/InputField"; 
import "@/app/styles/auth.css"; // Import CSS

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Lưu trữ thông báo lỗi nếu có
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    // Kiểm tra email hợp lệ (có thể thêm regex kiểm tra email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    // Hiển thị thông báo đăng nhập thành công (chưa kết nối backend)
    console.log("Email:", email);
    console.log("Mật khẩu:", password);
    alert("Đăng nhập thành công (chưa có backend)");

    // Đổi hướng đến trang chủ sau khi đăng nhập thành công
    router.push("/");
  };

  return (
    <Container maxWidth="xs">
      <Box className="login-container">
        <Typography variant="h4" textAlign="center">Đăng nhập</Typography>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <Typography color="error" textAlign="center">{error}</Typography>}

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleLogin} sx={{ marginTop: 2 }}>
          Đăng nhập
        </Button>

        <Typography textAlign="center" sx={{ marginTop: 2 }}>
          Chưa có tài khoản? <Button onClick={() => router.push("/auth/register")}>Đăng ký</Button>
        </Typography>
      </Box>
    </Container>
  );
}
  