import { ShoppingCart, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGuestCart } from "../lib/cartStorage";

export default function Header() {
  const [cartCount, setCartCount] = useState(() => getGuestCart().length);

  useEffect(() => {
    function updateCartCount() {
      setCartCount(getGuestCart().length);
    }

    window.addEventListener("guestCartUpdated", updateCartCount);
    return () =>
      window.removeEventListener("guestCartUpdated", updateCartCount);
  }, []);

  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="Techline - Trang chủ"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#e94f37] text-white">
            <Smartphone size={19} strokeWidth={2.2} />
          </span>
          <span className="text-lg font-bold tracking-tight">
            techline<span className="text-[#e94f37]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#666b75] md:flex">
          <a href="#danh-muc" className="transition hover:text-[#e94f37]">
            Danh mục
          </a>
          <a href="#san-pham" className="transition hover:text-[#e94f37]">
            Sản phẩm
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full border border-[#e5e6e9] px-4 py-2 text-sm font-semibold transition hover:border-[#17191d] hover:bg-[#17191d] hover:text-white sm:px-5"
          >
            Đăng nhập
          </Link>

          {/* <a
            href="#san-pham"
            aria-label="Xem sản phẩm"
            className="grid size-10 place-items-center rounded-full text-[#343943] transition hover:bg-[#f2f3f5]"
          >
            <ShoppingCart size={30} />
          </a> */}
          <a
            href="#san-pham"
            aria-label={`Giỏ hàng, ${cartCount} loại sản phẩm`}
            className="relative grid size-10 place-items-center rounded-full text-[#343943] transition hover:bg-[#f2f3f5]"
          >
            <ShoppingCart size={30} />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 grid h-5 min-w-5 
              place-items-center rounded-full 
              bg-[#e94f37] px-1 text-xs font-bold text-white"
              >
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}
