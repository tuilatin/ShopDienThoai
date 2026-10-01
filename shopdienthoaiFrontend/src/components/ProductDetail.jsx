import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useParams } from "react-router-dom";
import { getGuestCart, saveGuestCart } from "../lib/cartStorage";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const { maSanPham } = useParams();
  const [sanPham, setSanPham] = useState(null);
  useEffect(() => {
    apiClient
      .get(`sanpham/chitietsanpham/${maSanPham}`)
      .then((response) => setSanPham(response.data))
      .catch((error) => console.error("Lỗi tải sản phẩm: ", error));
  }, [maSanPham]);

  function handleAddToCart() {
    if (!sanPham) return;
    const cart = getGuestCart();
    const existingItem = cart.find(
      (item) => item.maSanPham === sanPham.maSanPham,
    );

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.maSanPham === sanPham.maSanPham
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [...cart, { ...sanPham, quantity }];
    saveGuestCart(updatedCart);
  }

  return (
    <>
      <Card
        className="relative mx-auto w-full max-w-sm pt-0"
        key={sanPham?.maSanPham}
      >
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={sanPham?.hinhAnh}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover  "
        />
        <CardHeader>
          <CardTitle>{sanPham?.tenSanPham}</CardTitle>
          <p>Giá: {sanPham?.giaBan} VNĐ</p>
          <p>Kho: {sanPham?.soLuongTon}</p>
        </CardHeader>
        {/* <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter> */}
      </Card>
      <p className="text-center">
        Mô tả: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row mt-4">
        <button
          className="border-2 w-10 hover:bg-blue-100 cursor-pointer"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          className="w-13 text-center"
          value={quantity}
          onChange={(changeEvent) =>
            setQuantity(Math.max(1, Number(changeEvent.target.value)) || 1)
          }
        />

        <button
          className="border-2 w-10 hover:bg-blue-100 cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
        <Button variant="outline" onClick={handleAddToCart}>
          Thêm vào giỏ
        </Button>
        <Button variant="outline">Mua ngay</Button>
      </div>
    </>
  );
}
