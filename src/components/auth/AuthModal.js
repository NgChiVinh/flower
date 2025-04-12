"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Chỉ dùng khi đăng ký
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError(""); // Xóa lỗi trước khi gửi request

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = JSON.stringify(isLogin ? { email, password } : { name, email, password });

      // 🔹 Sau này có thể thay bằng API thực
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra!");
      }

      localStorage.setItem("isLoggedIn", "true"); // Giả lập login
      window.dispatchEvent(new Event("storage")); // Cập nhật trạng thái login
      onClose(); // Đóng modal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? "Đăng nhập" : "Đăng ký"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, padding: 2 }}>
          {!isLogin && (
            <TextField
              label="Họ và tên"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            type="email"
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
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" fullWidth onClick={handleAuth}>
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </Button>
          <Button color="secondary" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Chưa có tài khoản? Đăng ký ngay!" : "Đã có tài khoản? Đăng nhập!"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
