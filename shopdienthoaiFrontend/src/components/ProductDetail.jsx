import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ProductDetail() {
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
        </CardHeader>
        {/* <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter> */}
      </Card>
      <p className="text-center">
        Mô tả: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod.
      </p>

      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
      </div>
    </>
  );
}
