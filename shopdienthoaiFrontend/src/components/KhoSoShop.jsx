import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Search,
  Trash2,
  ChevronDown,
  ChevronRight,
  PackageCheck,
  Truck,
  Clock3,
  Ban,
} from "lucide-react";

/* ---------------------------------------------------------
   DỮ LIỆU MẪU (khớp với schema ShopBanHang)
--------------------------------------------------------- */

const DANH_MUC = [
  { MaDanhMuc: "DM001", TenDanhMuc: "Apple iPhone", MoTa: "Điện thoại thông minh chính hãng từ Apple" },
  { MaDanhMuc: "DM002", TenDanhMuc: "Samsung Galaxy", MoTa: "Android cao cấp và màn hình gập" },
  { MaDanhMuc: "DM003", TenDanhMuc: "Xiaomi Series", MoTa: "Hiệu năng cao, giá tối ưu" },
  { MaDanhMuc: "DM004", TenDanhMuc: "Phụ kiện sạc cáp", MoTa: "Củ sạc nhanh, cáp Type-C, sạc không dây" },
  { MaDanhMuc: "DM005", TenDanhMuc: "Tai nghe & Âm thanh", MoTa: "True Wireless, chống ồn chủ động" },
];

const SAN_PHAM = [
  {
    MaSanPham: "SP001",
    TenSanPham: "iPhone 15 Pro Max 256GB",
    MaDanhMuc: "DM001",
    GiaBan: 29490000,
    SoLuongTon: 25,
    HinhAnh: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
    MoTa: "Khung titan chuẩn hàng không vũ trụ, chip Apple A17 Pro",
  },
  {
    MaSanPham: "SP002",
    TenSanPham: "Samsung Galaxy S24 Ultra 256GB",
    MaDanhMuc: "DM002",
    GiaBan: 27990000,
    SoLuongTon: 30,
    HinhAnh: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
    MoTa: "Bút S-Pen, Snapdragon 8 Gen 3 và Galaxy AI",
  },
  {
    MaSanPham: "SP003",
    TenSanPham: "Xiaomi 14 Ultra 512GB",
    MaDanhMuc: "DM003",
    GiaBan: 24990000,
    SoLuongTon: 15,
    HinhAnh: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
    MoTa: "4 camera cảm biến 1 inch hợp tác cùng Leica",
  },
  {
    MaSanPham: "SP004",
    TenSanPham: "Củ sạc Apple 20W Type-C",
    MaDanhMuc: "DM004",
    GiaBan: 550000,
    SoLuongTon: 100,
    HinhAnh: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600",
    MoTa: "Sạc nhanh chính hãng, chuẩn Power Delivery",
  },
  {
    MaSanPham: "SP005",
    TenSanPham: "Tai nghe AirPods Pro 2 Type-C",
    MaDanhMuc: "DM005",
    GiaBan: 5490000,
    SoLuongTon: 40,
    HinhAnh: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600",
    MoTa: "Chống ồn chủ động ANC gấp 2 lần, chip H2",
  },
];

const KHACH_HANG = [
  { MaKhachHang: "KH001", TenKhachHang: "Nguyễn Tuấn Anh", SoDienThoai: "0905123456" },
  { MaKhachHang: "KH002", TenKhachHang: "Trần Thị Mai", SoDienThoai: "0914987654" },
  { MaKhachHang: "KH003", TenKhachHang: "Lê Hoàng Nam", SoDienThoai: "0988112233" },
  { MaKhachHang: "KH004", TenKhachHang: "Phạm Minh Đức", SoDienThoai: "0977445566" },
  { MaKhachHang: "KH005", TenKhachHang: "Đỗ Phương Thảo", SoDienThoai: "0935667788" },
];

const CHI_TIET_BAN_DAU = [
  { MaChiTiet: "CT001", MaDonHang: "DH001", MaSanPham: "SP001", SoLuong: 1, DonGia: 29490000 },
  { MaChiTiet: "CT002", MaDonHang: "DH002", MaSanPham: "SP004", SoLuong: 1, DonGia: 550000 },
  { MaChiTiet: "CT003", MaDonHang: "DH002", MaSanPham: "SP005", SoLuong: 1, DonGia: 5490000 },
  { MaChiTiet: "CT004", MaDonHang: "DH003", MaSanPham: "SP002", SoLuong: 1, DonGia: 27990000 },
  { MaChiTiet: "CT005", MaDonHang: "DH005", MaSanPham: "SP004", SoLuong: 2, DonGia: 550000 },
];

const DON_HANG_BAN_DAU = [
  { MaDonHang: "DH001", MaKhachHang: "KH001", NgayDatHang: "2026-03-01", TongTien: 29490000, TrangThai: "Hoàn thành", DiaChiGiaoHang: "123 Lê Duẩn, Hải Châu, Đà Nẵng" },
  { MaDonHang: "DH002", MaKhachHang: "KH002", NgayDatHang: "2026-03-02", TongTien: 6040000, TrangThai: "Đang giao", DiaChiGiaoHang: "45 Hùng Vương, TP. Huế" },
  { MaDonHang: "DH003", MaKhachHang: "KH003", NgayDatHang: "2026-03-03", TongTien: 27990000, TrangThai: "Chờ xử lý", DiaChiGiaoHang: "78 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh" },
  { MaDonHang: "DH004", MaKhachHang: "KH004", NgayDatHang: "2026-03-04", TongTien: 24990000, TrangThai: "Chờ xử lý", DiaChiGiaoHang: "12 Hoàng Hoa Thám, Ba Đình, Hà Nội" },
  { MaDonHang: "DH005", MaKhachHang: "KH005", NgayDatHang: "2026-03-05", TongTien: 1100000, TrangThai: "Đã hủy", DiaChiGiaoHang: "90 Trần Phú, Lộc Thọ, Nha Trang" },
];

const money = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

const STATUS_META = {
  "Hoàn thành": { icon: PackageCheck, cls: "status-done" },
  "Đang giao": { icon: Truck, cls: "status-shipping" },
  "Chờ xử lý": { icon: Clock3, cls: "status-pending" },
  "Đã hủy": { icon: Ban, cls: "status-cancelled" },
};

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

export default function KhoSoShop() {
  const [view, setView] = useState("store"); // "store" | "orders"
  const [activeCat, setActiveCat] = useState("ALL");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]); // {MaSanPham, SoLuong}
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState("cart"); // cart | form | done
  const [form, setForm] = useState({ TenKhachHang: "", SoDienThoai: "", DiaChiGiaoHang: "" });
  const [formError, setFormError] = useState("");
  const [orders, setOrders] = useState(DON_HANG_BAN_DAU);
  const [chiTiet, setChiTiet] = useState(CHI_TIET_BAN_DAU);
  const [customers, setCustomers] = useState(KHACH_HANG);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [lastOrderCode, setLastOrderCode] = useState("");

  const productMap = useMemo(() => Object.fromEntries(SAN_PHAM.map((p) => [p.MaSanPham, p])), []);
  const catMap = useMemo(() => Object.fromEntries(DANH_MUC.map((c) => [c.MaDanhMuc, c])), []);
  const customerMap = useMemo(() => Object.fromEntries(customers.map((c) => [c.MaKhachHang, c])), [customers]);

  const filteredProducts = SAN_PHAM.filter((p) => {
    const inCat = activeCat === "ALL" || p.MaDanhMuc === activeCat;
    const inQuery = p.TenSanPham.toLowerCase().includes(query.toLowerCase());
    return inCat && inQuery;
  });

  const cartLines = cart.map((c) => ({ ...c, product: productMap[c.MaSanPham] }));
  const cartCount = cart.reduce((s, c) => s + c.SoLuong, 0);
  const cartTotal = cartLines.reduce((s, c) => s + c.product.GiaBan * c.SoLuong, 0);

  function addToCart(MaSanPham) {
    setCart((prev) => {
      const found = prev.find((c) => c.MaSanPham === MaSanPham);
      if (found) {
        return prev.map((c) => (c.MaSanPham === MaSanPham ? { ...c, SoLuong: c.SoLuong + 1 } : c));
      }
      return [...prev, { MaSanPham, SoLuong: 1 }];
    });
    setCartOpen(true);
    setStep("cart");
  }

  function changeQty(MaSanPham, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.MaSanPham === MaSanPham ? { ...c, SoLuong: c.SoLuong + delta } : c))
        .filter((c) => c.SoLuong > 0)
    );
  }

  function removeLine(MaSanPham) {
    setCart((prev) => prev.filter((c) => c.MaSanPham !== MaSanPham));
  }

  function submitOrder(e) {
    e.preventDefault();
    if (!form.TenKhachHang.trim() || !form.SoDienThoai.trim() || !form.DiaChiGiaoHang.trim()) {
      setFormError("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.");
      return;
    }
    setFormError("");

    let khachHang = customers.find((c) => c.SoDienThoai === form.SoDienThoai.trim());
    if (!khachHang) {
      khachHang = {
        MaKhachHang: "KH" + String(customers.length + 1).padStart(3, "0"),
        TenKhachHang: form.TenKhachHang.trim(),
        SoDienThoai: form.SoDienThoai.trim(),
      };
      setCustomers((prev) => [...prev, khachHang]);
    }

    const MaDonHang = "DH" + String(orders.length + 1).padStart(3, "0");
    const newOrder = {
      MaDonHang,
      MaKhachHang: khachHang.MaKhachHang,
      NgayDatHang: new Date().toISOString().slice(0, 10),
      TongTien: cartTotal,
      TrangThai: "Chờ xử lý",
      DiaChiGiaoHang: form.DiaChiGiaoHang.trim(),
    };
    const newChiTiet = cartLines.map((c, i) => ({
      MaChiTiet: "CT" + String(chiTiet.length + i + 1).padStart(3, "0"),
      MaDonHang,
      MaSanPham: c.MaSanPham,
      SoLuong: c.SoLuong,
      DonGia: c.product.GiaBan,
    }));

    setOrders((prev) => [newOrder, ...prev]);
    setChiTiet((prev) => [...newChiTiet, ...prev]);
    setLastOrderCode(MaDonHang);
    setCart([]);
    setStep("done");
  }

  function closeCart() {
    setCartOpen(false);
    setTimeout(() => {
      setStep("cart");
      setForm({ TenKhachHang: "", SoDienThoai: "", DiaChiGiaoHang: "" });
      setFormError("");
    }, 250);
  }

  const ordersWithDetails = orders.map((o) => ({
    ...o,
    khach: customerMap[o.MaKhachHang],
    lines: chiTiet.filter((ct) => ct.MaDonHang === o.MaDonHang),
  }));

  return (
    <div className="khoso-app">
      <style>{`
        .khoso-app {
          --ink: #16213e;
          --ink-soft: #3c4566;
          --paper: #f6f4ee;
          --paper-raised: #ffffff;
          --line: #ddd8c8;
          --teal: #12897b;
          --teal-dark: #0d685e;
          --coral: #d3502f;
          --amber: #b3791f;
          font-family: 'Work Sans', 'Segoe UI', sans-serif;
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow-x: hidden;
        }
        .khoso-app * { box-sizing: border-box; }
        .khoso-app h1, .khoso-app h2, .khoso-app h3, .khoso-app .display {
          font-family: 'Sora', 'Segoe UI', sans-serif;
        }
        .khoso-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 28px; border-bottom: 1px solid var(--line);
          background: var(--paper); position: sticky; top: 0; z-index: 20;
        }
        .khoso-brand { display: flex; align-items: baseline; gap: 8px; }
        .khoso-brand .mark { font-family: 'Sora'; font-weight: 700; font-size: 22px; letter-spacing: -0.02em; }
        .khoso-brand .mark span { color: var(--teal); }
        .khoso-brand .tag { font-size: 12.5px; color: var(--ink-soft); display: none; }
        @media (min-width: 640px) { .khoso-brand .tag { display: inline; } }
        .khoso-nav { display: flex; gap: 4px; background: var(--paper-raised); border: 1px solid var(--line); border-radius: 10px; padding: 3px; }
        .khoso-nav button {
          border: none; background: transparent; padding: 7px 14px; border-radius: 8px;
          font-family: inherit; font-size: 14px; font-weight: 500; color: var(--ink-soft); cursor: pointer;
        }
        .khoso-nav button.active { background: var(--ink); color: var(--paper); }
        .cart-btn {
          position: relative; display: flex; align-items: center; gap: 8px;
          background: var(--teal); color: white; border: none; border-radius: 10px;
          padding: 9px 16px; font-family: inherit; font-weight: 500; font-size: 14px; cursor: pointer;
        }
        .cart-btn:hover { background: var(--teal-dark); }
        .cart-badge {
          background: var(--coral); color: white; border-radius: 999px; font-size: 11px;
          min-width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
        }

        .hero { padding: 40px 28px 24px; max-width: 1160px; margin: 0 auto; }
        .hero h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 600; line-height: 1.15; max-width: 620px; margin: 0 0 10px; }
        .hero p { color: var(--ink-soft); max-width: 520px; font-size: 15.5px; line-height: 1.5; margin: 0; }

        .toolbar { max-width: 1160px; margin: 0 auto; padding: 0 28px 8px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .search-box { display: flex; align-items: center; gap: 8px; background: var(--paper-raised); border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; flex: 1; min-width: 200px; max-width: 320px; }
        .search-box input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 14px; width: 100%; color: var(--ink); }
        .chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip {
          border: 1px solid var(--line); background: var(--paper-raised); border-radius: 999px;
          padding: 7px 14px; font-size: 13.5px; font-family: inherit; color: var(--ink-soft); cursor: pointer;
        }
        .chip.active { background: var(--ink); border-color: var(--ink); color: var(--paper); }

        .grid { max-width: 1160px; margin: 20px auto 60px; padding: 0 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; }
        .card { background: var(--paper-raised); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; }
        .card .thumb { aspect-ratio: 4/3; overflow: hidden; background: #eee; }
        .card .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .card .body { padding: 14px 14px 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .card .cat { font-size: 11.5px; color: var(--teal-dark); font-weight: 600; }
        .card .name { font-family: 'Sora'; font-size: 15.5px; font-weight: 600; line-height: 1.3; }
        .card .desc { font-size: 12.8px; color: var(--ink-soft); line-height: 1.4; flex: 1; }
        .card .foot { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
        .price { font-family: 'Sora'; font-weight: 600; font-size: 15px; }
        .stock { font-size: 11.5px; margin-top: 2px; }
        .stock.ok { color: var(--teal-dark); }
        .stock.low { color: var(--amber); }
        .stock.out { color: var(--coral); }
        .add-btn {
          border: none; background: var(--ink); color: var(--paper); border-radius: 8px;
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .add-btn:disabled { background: #cfcabb; cursor: not-allowed; }

        .overlay { position: fixed; inset: 0; background: rgba(22,33,62,0.35); z-index: 30; opacity: 0; pointer-events: none; transition: opacity .2s; }
        .overlay.open { opacity: 1; pointer-events: auto; }
        .drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: 380px; max-width: 92vw;
          background: var(--paper-raised); z-index: 40; box-shadow: -8px 0 24px rgba(0,0,0,0.08);
          transform: translateX(100%); transition: transform .25s ease; display: flex; flex-direction: column;
        }
        .drawer.open { transform: translateX(0); }
        .drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--line); }
        .drawer-head h3 { margin: 0; font-size: 17px; }
        .icon-btn { border: none; background: transparent; cursor: pointer; color: var(--ink-soft); padding: 4px; }
        .drawer-body { flex: 1; overflow-y: auto; padding: 14px 20px; }
        .cart-line { display: flex; gap: 10px; padding: 12px 0; border-bottom: 1px solid var(--line); }
        .cart-line img { width: 52px; height: 52px; border-radius: 8px; object-fit: cover; }
        .cart-line .info { flex: 1; }
        .cart-line .info .n { font-size: 13.5px; font-weight: 500; line-height: 1.3; }
        .cart-line .info .p { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; }
        .qty { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .qty button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--line); background: var(--paper); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .qty span { font-size: 13px; min-width: 16px; text-align: center; }
        .rm-btn { border: none; background: transparent; color: var(--ink-soft); cursor: pointer; align-self: flex-start; }
        .empty-cart { text-align: center; color: var(--ink-soft); font-size: 14px; padding: 60px 10px; }
        .drawer-foot { padding: 16px 20px; border-top: 1px solid var(--line); }
        .total-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 12px; }
        .total-row strong { font-family: 'Sora'; font-size: 17px; }
        .primary-btn {
          width: 100%; border: none; background: var(--teal); color: white; border-radius: 10px;
          padding: 12px; font-family: inherit; font-weight: 500; font-size: 14.5px; cursor: pointer;
        }
        .primary-btn:hover { background: var(--teal-dark); }
        .field { margin-bottom: 12px; }
        .field label { display: block; font-size: 12.5px; color: var(--ink-soft); margin-bottom: 5px; }
        .field input, .field textarea {
          width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 9px 11px;
          font-family: inherit; font-size: 13.5px; outline: none; background: var(--paper);
        }
        .field input:focus, .field textarea:focus { border-color: var(--teal); }
        .form-error { color: var(--coral); font-size: 12.5px; margin-bottom: 10px; }
        .done-box { text-align: center; padding: 30px 6px; }
        .done-box .check { width: 46px; height: 46px; border-radius: 999px; background: var(--teal); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
        .done-box h4 { margin: 0 0 6px; font-size: 17px; }
        .done-box p { color: var(--ink-soft); font-size: 13.5px; margin: 0 0 18px; }
        .back-link { border: none; background: transparent; color: var(--teal-dark); font-weight: 500; font-size: 13.5px; cursor: pointer; margin-bottom: 4px; }

        .orders-wrap { max-width: 900px; margin: 0 auto; padding: 32px 28px 60px; }
        .orders-wrap h2 { font-size: 24px; margin: 0 0 4px; }
        .orders-wrap > p { color: var(--ink-soft); font-size: 14px; margin: 0 0 22px; }
        .order-card { background: var(--paper-raised); border: 1px solid var(--line); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
        .order-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; cursor: pointer; }
        .order-row .code { font-family: 'Sora'; font-weight: 600; font-size: 14.5px; width: 64px; }
        .order-row .who { flex: 1; min-width: 0; }
        .order-row .who .n { font-size: 14px; font-weight: 500; }
        .order-row .who .d { font-size: 12px; color: var(--ink-soft); }
        .order-row .amt { font-family: 'Sora'; font-weight: 600; font-size: 14px; }
        .status-pill { display: flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 600; }
        .status-done { background: #e1f0e5; color: #1f7a3c; }
        .status-shipping { background: #dceef0; color: var(--teal-dark); }
        .status-pending { background: #f6ead2; color: var(--amber); }
        .status-cancelled { background: #f5dcd6; color: var(--coral); }
        .order-details { border-top: 1px solid var(--line); padding: 12px 16px 16px; background: var(--paper); }
        .order-details .addr { font-size: 12.5px; color: var(--ink-soft); margin-bottom: 10px; }
        .detail-line { display: flex; justify-content: space-between; font-size: 13px; padding: 5px 0; }
        .detail-line .l { color: var(--ink-soft); }

        @media (max-width: 560px) {
          .khoso-header { padding: 14px 16px; }
          .hero, .toolbar, .grid, .orders-wrap { padding-left: 16px; padding-right: 16px; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      {/* HEADER */}
      <header className="khoso-header">
        <div className="khoso-brand">
          <span className="mark">Kho<span>Số</span></span>
          <span className="tag">Điện thoại &amp; phụ kiện chính hãng</span>
        </div>
        <nav className="khoso-nav">
          <button className={view === "store" ? "active" : ""} onClick={() => setView("store")}>Sản phẩm</button>
          <button className={view === "orders" ? "active" : ""} onClick={() => setView("orders")}>Đơn hàng</button>
        </nav>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={17} />
          Giỏ hàng
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </header>

      {view === "store" ? (
        <>
          <div className="hero">
            <h1>Điện thoại chính hãng, giao nhanh khắp Việt Nam.</h1>
            <p>Chọn từ iPhone, Samsung Galaxy, Xiaomi và phụ kiện đi kèm — giá niêm yết, còn hàng cập nhật theo thời gian thực.</p>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={15} color="#6b6558" />
              <input placeholder="Tìm sản phẩm..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="chips">
              <button className={"chip" + (activeCat === "ALL" ? " active" : "")} onClick={() => setActiveCat("ALL")}>Tất cả</button>
              {DANH_MUC.map((c) => (
                <button key={c.MaDanhMuc} className={"chip" + (activeCat === c.MaDanhMuc ? " active" : "")} onClick={() => setActiveCat(c.MaDanhMuc)}>
                  {c.TenDanhMuc}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filteredProducts.map((p) => {
              const stockLabel = p.SoLuongTon === 0 ? "Hết hàng" : p.SoLuongTon <= 15 ? `Sắp hết · còn ${p.SoLuongTon}` : `Còn hàng · ${p.SoLuongTon}`;
              const stockCls = p.SoLuongTon === 0 ? "out" : p.SoLuongTon <= 15 ? "low" : "ok";
              return (
                <div className="card" key={p.MaSanPham}>
                  <div className="thumb"><img src={p.HinhAnh} alt={p.TenSanPham} /></div>
                  <div className="body">
                    <span className="cat">{catMap[p.MaDanhMuc].TenDanhMuc}</span>
                    <span className="name">{p.TenSanPham}</span>
                    <span className="desc">{p.MoTa}</span>
                    <div className="foot">
                      <div>
                        <div className="price">{money(p.GiaBan)}</div>
                        <div className={"stock " + stockCls}>{stockLabel}</div>
                      </div>
                      <button className="add-btn" disabled={p.SoLuongTon === 0} onClick={() => addToCart(p.MaSanPham)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="orders-wrap">
          <h2>Đơn hàng</h2>
          <p>{orders.length} đơn hàng · nhấn vào một đơn để xem chi tiết sản phẩm</p>
          {ordersWithDetails.map((o) => {
            const meta = STATUS_META[o.TrangThai];
            const Icon = meta.icon;
            const isOpen = expandedOrder === o.MaDonHang;
            return (
              <div className="order-card" key={o.MaDonHang}>
                <div className="order-row" onClick={() => setExpandedOrder(isOpen ? null : o.MaDonHang)}>
                  {isOpen ? <ChevronDown size={16} color="#6b6558" /> : <ChevronRight size={16} color="#6b6558" />}
                  <span className="code">{o.MaDonHang}</span>
                  <div className="who">
                    <div className="n">{o.khach ? o.khach.TenKhachHang : "—"}</div>
                    <div className="d">{o.NgayDatHang}</div>
                  </div>
                  <span className={"status-pill " + meta.cls}><Icon size={12} />{o.TrangThai}</span>
                  <span className="amt">{money(o.TongTien)}</span>
                </div>
                {isOpen && (
                  <div className="order-details">
                    <div className="addr">Giao đến: {o.DiaChiGiaoHang}</div>
                    {o.lines.map((l) => (
                      <div className="detail-line" key={l.MaChiTiet}>
                        <span className="l">{productMap[l.MaSanPham]?.TenSanPham || l.MaSanPham} × {l.SoLuong}</span>
                        <span>{money(l.DonGia * l.SoLuong)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CART DRAWER */}
      <div className={"overlay" + (cartOpen ? " open" : "")} onClick={closeCart} />
      <div className={"drawer" + (cartOpen ? " open" : "")}>
        <div className="drawer-head">
          <h3>{step === "form" ? "Thông tin giao hàng" : step === "done" ? "Đặt hàng thành công" : "Giỏ hàng"}</h3>
          <button className="icon-btn" onClick={closeCart}><X size={19} /></button>
        </div>

        {step === "cart" && (
          <>
            <div className="drawer-body">
              {cartLines.length === 0 ? (
                <div className="empty-cart">Giỏ hàng đang trống.<br />Chọn sản phẩm để bắt đầu.</div>
              ) : (
                cartLines.map((c) => (
                  <div className="cart-line" key={c.MaSanPham}>
                    <img src={c.product.HinhAnh} alt={c.product.TenSanPham} />
                    <div className="info">
                      <div className="n">{c.product.TenSanPham}</div>
                      <div className="p">{money(c.product.GiaBan)}</div>
                      <div className="qty">
                        <button onClick={() => changeQty(c.MaSanPham, -1)}><Minus size={12} /></button>
                        <span>{c.SoLuong}</span>
                        <button onClick={() => changeQty(c.MaSanPham, 1)}><Plus size={12} /></button>
                      </div>
                    </div>
                    <button className="rm-btn" onClick={() => removeLine(c.MaSanPham)}><Trash2 size={15} /></button>
                  </div>
                ))
              )}
            </div>
            {cartLines.length > 0 && (
              <div className="drawer-foot">
                <div className="total-row"><span>Tổng cộng</span><strong>{money(cartTotal)}</strong></div>
                <button className="primary-btn" onClick={() => setStep("form")}>Tiến hành đặt hàng</button>
              </div>
            )}
          </>
        )}

        {step === "form" && (
          <>
            <div className="drawer-body">
              <button className="back-link" onClick={() => setStep("cart")}>← Quay lại giỏ hàng</button>
              <form onSubmit={submitOrder}>
                <div className="field">
                  <label>Họ và tên</label>
                  <input value={form.TenKhachHang} onChange={(e) => setForm({ ...form, TenKhachHang: e.target.value })} placeholder="Nguyễn Văn A" />
                </div>
                <div className="field">
                  <label>Số điện thoại</label>
                  <input value={form.SoDienThoai} onChange={(e) => setForm({ ...form, SoDienThoai: e.target.value })} placeholder="09xxxxxxxx" />
                </div>
                <div className="field">
                  <label>Địa chỉ giao hàng</label>
                  <textarea rows={3} value={form.DiaChiGiaoHang} onChange={(e) => setForm({ ...form, DiaChiGiaoHang: e.target.value })} placeholder="Số nhà, đường, phường/xã, tỉnh/thành" />
                </div>
                {formError && <div className="form-error">{formError}</div>}
                <div className="total-row"><span>Tổng thanh toán</span><strong>{money(cartTotal)}</strong></div>
                <button className="primary-btn" type="submit">Xác nhận đặt hàng</button>
              </form>
            </div>
          </>
        )}

        {step === "done" && (
          <div className="drawer-body">
            <div className="done-box">
              <div className="check"><PackageCheck size={22} /></div>
              <h4>Đơn hàng {lastOrderCode} đã được tạo</h4>
              <p>Chúng tôi sẽ liên hệ để xác nhận trước khi giao. Bạn có thể theo dõi trạng thái trong mục "Đơn hàng".</p>
              <button className="primary-btn" onClick={() => { closeCart(); setView("orders"); }}>Xem đơn hàng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
