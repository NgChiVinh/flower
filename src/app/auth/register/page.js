"use client";  // Đảm bảo rằng bạn sử dụng "use client" nếu trang sử dụng hooks của React

import { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";  // Dùng useRouter để điều hướng sau khi đăng ký thành công

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // Ở đây bạn có thể gọi API đăng ký thực tế
    // Sau khi đăng ký thành công, bạn có thể chuyển hướng về trang đăng nhập hoặc trang chủ
    router.push("/auth/login");  // Điều hướng tới trang đăng nhập sau khi đăng ký
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
        <Typography variant="h4" textAlign="center">Đăng ký</Typography>
        
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
          label="Mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button variant="contained" fullWidth onClick={handleRegister} sx={{ marginTop: 2 }}>
          Đăng ký
        </Button>
      </Box>
    </Container>
  );
}
