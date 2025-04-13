"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ cartCount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInitial, setUserInitial] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const email = localStorage.getItem("userEmail") || "";
      setIsLoggedIn(loggedIn);
      setUserInitial(email ? email.charAt(0).toUpperCase() : "");
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
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setAnchorEl(null);
    window.dispatchEvent(new Event("storage"));
    router.push("/"); // chuyển về trang chủ
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", py: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
          <IconButton>
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>

          {isLoggedIn ? (
  <>
    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: "#f48fb1",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {userInitial}
      </Avatar>
    </IconButton>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
      <MenuItem
        onClick={() => {
          router.push("/orders");
          setAnchorEl(null);
        }}
      >
        Đơn hàng của tôi
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
        Đăng xuất
        </MenuItem>
      </Menu>
      </>
      ) : (
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
