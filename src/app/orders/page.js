"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse());
  }, []);

  const handleCancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.status === "pending" && order.id === id
        ? { ...order, status: "canceled" }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify([...updatedOrders].reverse()));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusText = {
    pending: "Đang chờ xử lý",
    processing: "Đang xử lý",
    shipped: "Đã vận chuyển",
    delivered: "Đã giao",
    canceled: "Đã hủy",
  };

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Đơn hàng của tôi
      </Typography>

      {orders.length === 0 ? (
        <Typography>Không có đơn hàng nào.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Mã đơn: #{order.id}
              </Typography>
              <Typography>Ngày đặt: {formatDate(order.createdAt)}</Typography>
              <Typography>Người nhận: {order.customerName}</Typography>
              <Typography>Số điện thoại: {order.customerPhone}</Typography>
              <Typography>Email: {order.customerEmail}</Typography>
              <Typography>Địa chỉ: {order.shippingAddress}</Typography>
              <Typography>
                Trạng thái:{" "}
                <span
                    style={{
                    fontWeight: "bold",
                    color: order.status === "canceled" ? "#f44336" : "#4caf50", // đỏ nếu là canceled, còn lại xanh
                    }}
                 >
                    {statusText[order.status] || order.status}
                </span>
            </Typography>


              <Divider sx={{ my: 2 }} />

              {Array.isArray(order.products) && order.products.length > 0 ? (
                order.products.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <img
                      src={item.product?.image || "/images/default.jpg"}
                      alt={item.product?.name || "Sản phẩm"}
                      style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <Box>
                      <Typography>{item.product?.name || "Sản phẩm"}</Typography>
                      <Typography color="text.secondary">
                        x{item.quantity}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto", fontWeight: "bold" }}>
                      {(item.product?.price * item.quantity || 0).toLocaleString()} VND
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  Không có sản phẩm nào trong đơn hàng.
                </Typography>
              )}

              <Divider sx={{ mt: 2, mb: 1 }} />
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                Tổng cộng: {order.totalAmount?.toLocaleString()} VND
              </Typography>

              {order.status === "pending" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Hủy đơn hàng
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
