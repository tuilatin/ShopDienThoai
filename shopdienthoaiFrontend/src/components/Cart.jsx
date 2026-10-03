import { useState } from "react";
import { Minus, Plus, Smartphone, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getGuestCart } from "../lib/cartStorage";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

export default function Cart() {
  const [items, setItems] = useState(getGuestCart());
  const total = items.reduce(
    (sum, item) => sum + item.donGia * item.quantity,
    0,
  );

  function updateQuantity(maSanPham, quantity) {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.maSanPham === maSanPham
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );
  }

  function removeItem(maSanPham) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.maSanPham !== maSanPham),
    );
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f7f8fa] px-4 py-8 text-[#17191d] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 border-b border-[#e3e5e9] pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e94f37]">
            Đơn hàng của bạn
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Giỏ hàng</h1>
          <p className="mt-1 text-sm text-[#777c85]">{items.length} sản phẩm</p>
        </div>

        {items.length === 0 ? (
          <p className="py-12 text-center text-[#777c85]">
            Giỏ hàng đang trống.
          </p>
        ) : (
          <>
            <div>
              {items.map((item) => (
                <article
                  key={item.maSanPham}
                  className="grid gap-4 border-b border-[#e3e5e9] py-5 sm:grid-cols-[minmax(0,1fr)_150px_120px_120px_36px] sm:items-center"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="grid size-20 shrink-0 place-items-center bg-white text-[#9ba1aa]">
                      <Smartphone size={32} strokeWidth={1.4} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold leading-5">
                        {item.tenSanPham}
                      </h2>
                      <p className="mt-1 text-xs text-[#858a94]">
                        Mã: {item.maSanPham}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#e94f37] sm:hidden">
                        {formatCurrency(item.giaBan * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-[#858a94] sm:hidden">
                      Số lượng
                    </p>
                    <div className="inline-flex h-9 items-center border border-[#dfe1e5] bg-white">
                      <button
                        type="button"
                        aria-label={`Giảm số lượng ${item.tenSanPham}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.maSanPham, item.quantity - 1)
                        }
                        className="grid size-9 place-items-center text-[#555b65] transition hover:bg-[#f1f2f4] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        aria-label={`Số lượng ${item.tenSanPham}`}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.maSanPham, event.target.value)
                        }
                        className="h-full w-11 border-x border-[#e7e8eb] text-center text-sm outline-none"
                      />
                      <button
                        type="button"
                        aria-label={`Tăng số lượng ${item.tenSanPham}`}
                        onClick={() =>
                          updateQuantity(item.maSanPham, item.quantity + 1)
                        }
                        className="grid size-9 place-items-center text-[#555b65] transition hover:bg-[#f1f2f4]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden text-sm text-[#555b65] sm:block">
                    {formatCurrency(item.giaBan)}
                  </div>
                  <div className="text-sm font-semibold">
                    <span className="mr-2 text-xs font-normal text-[#858a94] sm:hidden">
                      Thành tiền:
                    </span>
                    {formatCurrency(item.giaBan * item.quantity)}
                  </div>
                  <button
                    type="button"
                    aria-label={`Xóa ${item.tenSanPham} khỏi giỏ hàng`}
                    onClick={() => removeItem(item.maSanPham)}
                    className="grid size-9 place-items-center text-[#858a94] transition hover:bg-[#fff0ec] hover:text-[#c74430]"
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>

            <div className="ml-auto mt-6 flex max-w-sm items-center justify-between border-t border-[#dfe1e5] pt-5">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-[#e94f37]">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="mt-5 flex justify-end">
              <Button className="bg-[#e94f37] text-white hover:bg-[#d9412b]">
                Tiến hành đặt hàng
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
