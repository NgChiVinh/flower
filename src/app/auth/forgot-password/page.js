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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InputField from "@/components/ui/InputField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = () => {
    if (!email) {
      setError("Vui lòng nhập email.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    alert("Liên kết đặt lại mật khẩu đã được gửi (giả lập)");
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            color="#546e7a"
            mb={2}
          >
            Quên mật khẩu
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <InputField
            label="Nhập email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#ec407a" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleReset}
            sx={{
              mt: 3,
              borderRadius: 2,
              backgroundColor: "#90a4ae",
              "&:hover": {
                backgroundColor: "#546e7a",
              },
            }}
          >
            Gửi yêu cầu
          </Button>

          <Typography textAlign="center" mt={3}>
            Đã nhớ mật khẩu?{" "}
            <Box
              component="span"
              sx={{
                color: "#546e7a",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => router.push("/auth/login")}
            >
              Đăng nhập
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
