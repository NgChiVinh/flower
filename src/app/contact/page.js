"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Kiểm tra họ và tên phải có ít nhất 2 từ
    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    } else if (form.name.trim().split(" ").length < 2) {
      newErrors.name = "Vui lòng nhập đầy đủ họ và tên";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // SĐT: bắt đầu bằng 0, 10 chữ số
    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^0\d{9}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0";
    }

    // Nội dung
    if (!form.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung liên hệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Liên hệ của bạn đã được gửi. Cảm ơn bạn! ❤️");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  };

  return (
    <>
      <Box sx={{ borderBottom: "2px solid #ddd" }}>
        <Navbar cartCount={0} />
      </Box>

      <Container sx={{ mt: 6, mb: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4, color: "#ec407a" }}
        >
          Liên hệ với Floral Haven 🌷
        </Typography>

        <Grid container spacing={6}>
          {/* Thông tin liên hệ */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Thông tin liên hệ
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <RoomIcon color="secondary" sx={{ mr: 2 }} />
              <Typography>
                69/68 Đ.Đặng Thuỳ Trâm, Bình Thạnh, TP.Hồ Chí Minh
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon color="secondary" sx={{ mr: 2 }} />
              <Typography>0123 456 789</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon color="secondary" sx={{ mr: 2 }} />
              <Typography>contact@floralhaven.vn</Typography>
            </Box>

            <Box mt={3}>
              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7819217782274!2d106.6974455!3d10.8275396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaCBob2MgVsSDbiBMYW5nIC0gQ8awIHPhu58gY2jDrW5o!5e0!3m2!1svi!2s!4v1713170559632!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>

          {/* Form liên hệ */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Gửi tin nhắn cho chúng tôi
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                name="name"
                label="Họ và tên"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                name="phone"
                label="Số điện thoại"
                fullWidth
                required
                value={form.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                name="message"
                label="Nội dung"
                multiline
                rows={4}
                fullWidth
                required
                value={form.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
              />
              <Button variant="contained" color="secondary" type="submit">
                Gửi liên hệ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
