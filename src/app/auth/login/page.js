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
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Vui lòng nhập email.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Email không hợp lệ.";
    }

    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    // ✅ Giả lập đăng nhập
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    window.dispatchEvent(new Event("storage"));

    alert("Đăng nhập thành công! (CHƯA kết nối backend)");
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
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="#546e7a">
            Đăng Nhập
          </Typography>

          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Quên mật khẩu */}
            <Box textAlign="right">
              <MuiLink
                underline="hover"
                color="secondary"
                fontSize="0.9rem"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push("/auth/forgot-password")}
              >
                Quên mật khẩu?
              </MuiLink>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogin}
              sx={{ borderRadius: 2 }}
            >
              Đăng nhập
            </Button>

            <Typography textAlign="center">
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
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
