"use client";

import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        🎉 Chào mừng đến trang quản trị Floral Haven!
      </Typography>

      <Grid container spacing={3}>
        {/* Sản phẩm */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">📦 Sản phẩm</Typography>
            <Typography variant="h4" color="primary">128</Typography>
            <Button component={Link} href="/admin/product" sx={{ mt: 2 }} variant="outlined">Quản lý</Button>
          </Paper>
        </Grid>

        {/* Danh mục */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">📁 Danh mục</Typography>
            <Typography variant="h4" color="primary">5</Typography>
            <Button sx={{ mt: 2 }} variant="outlined">Quản lý</Button>
          </Paper>
        </Grid>

        {/* Đơn hàng */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">🛒 Đơn hàng</Typography>
            <Typography variant="h4" color="primary">32</Typography>
            <Button sx={{ mt: 2 }} variant="outlined">Xem đơn</Button>
          </Paper>
        </Grid>

        {/* Mã giảm giá */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">🎁 Mã giảm giá</Typography>
            <Typography variant="h4" color="primary">8</Typography>
            <Button sx={{ mt: 2 }} variant="outlined">Thiết lập</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
