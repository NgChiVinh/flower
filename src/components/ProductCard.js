import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductCard({ product, addToCart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      {/* Ảnh sản phẩm */}
      <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
        <Link href={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Image
            src={product.image}
            alt={product.name}
            width={650}
            height={350}
            style={{
              borderRadius: "12px",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>
        {/* Hiệu ứng hover với các icon */}
        {hovered && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              gap: 5  ,
            }}
          >
            <IconButton sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.3)" }}>
              <VisibilityIcon />
            </IconButton>
            <IconButton sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.3)" }} onClick={() => addToCart(product)}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.3)" }}>
              <FavoriteIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Thông tin sản phẩm */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {product.discount ? (
            <>
              <Typography variant="body1" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                {product.originalPrice} VND
              </Typography>
              <Typography variant="body1" color="error" fontWeight="bold">
                {product.price} VND
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="#388e3c" fontWeight="bold">
              {product.price} VND
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
