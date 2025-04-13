"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import InputField from "@/components/ui/InputField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }
  
    // ✅ Lưu trạng thái đăng nhập
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email); // 👉 Lưu email để hiện avatar
    window.dispatchEvent(new Event("storage")); // Cập nhật UI
  
    alert("Đăng nhập thành công!(CHƯA CÓ BACKEND NHÉ HƯNG)");
    router.push("/");
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="#546e7a">
            Đăng Nhập
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mt={1}>
              {error}
            </Typography>
          )}

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <InputField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Quên mật khẩu */}
          <Box textAlign="right" mt={1}>
            <MuiLink
              underline="hover"
              color="secondary"
              fontSize="0.9rem"
              onClick={() => router.push("/auth/forgot-password")}
              sx={{ cursor: "pointer" }}
            >
              Quên mật khẩu?
            </MuiLink>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Đăng nhập
          </Button>

          {/* Đăng ký rõ ràng hơn */}
          <Typography textAlign="center" mt={3}>
            Bạn chưa có tài khoản?{" "}
            <MuiLink
              color="secondary"
              fontWeight="bold"
              underline="hover"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/auth/register")}
            >
              Đăng ký ngay
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
