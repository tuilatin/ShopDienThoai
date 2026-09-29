import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>Tên sản phẩm</CardTitle>
          <p>Giá: 10.000.000 VND</p>
          <p>Kho: 25</p>
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
        <Button variant="outline">Thêm vào giỏ</Button>
        <Button variant="outline">Mua ngay</Button>
      </div>
    </>
  );
}
