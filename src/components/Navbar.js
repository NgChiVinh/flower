"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Import useRouter
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar({ cartCount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();  // Khai báo useRouter để sử dụng cho điều hướng

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const scrollToAbout = () => {
    if (window.location.pathname === "/") {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#about-section");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: "15px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "80px" }}>
        {/* Logo */}
        <Link href="/" passHref>
          <img src="/images/logo.png" alt="Logo" style={{ height: "60px", cursor: "pointer" }} />
        </Link>

        {/* Menu */}
        <Box sx={{ display: "flex", gap: 4, fontSize: "18px" }}>
          <Link href="/" passHref>
            <Button sx={{ textTransform: "none", color: "black", fontSize: "18px" }}>Trang chủ</Button>
          </Link>
          <Button onClick={scrollToAbout} sx={{ textTransform: "none", color: "black", fontSize: "18px" }}>Giới thiệu</Button>
          <Link href="/shop" passHref>
            <Button sx={{ textTransform: "none", color: "black", fontSize: "18px" }}>Cửa hàng</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button sx={{ textTransform: "none", color: "black", fontSize: "18px" }}>Liên hệ</Button>
          </Link>
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>

          {/* Nếu đăng nhập, hiển thị Avatar, nếu chưa thì hiển thị nút đăng nhập */}
          {isLoggedIn ? (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            // Chuyển hướng tới trang đăng nhập
            <IconButton onClick={() => router.push("/auth/login")}>
              <PersonIcon sx={{ color: "black" }} />
            </IconButton>
          )}

          {/* Giỏ hàng */}
          <IconButton color="inherit">
            <Link href="/cart" passHref>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon sx={{ color: "black" }} />
              </Badge>
            </Link>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
