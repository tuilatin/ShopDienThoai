import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Search,
  ShoppingBag,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

export default function Home() {
  const { danhMucs, sanPhams } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = sanPhams.filter((sanPham) =>
    `${sanPham.tenSanPham} ${sanPham.moTa ?? ""}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase()),
  );
  const featuredProduct = sanPhams[0];

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#17191d]">
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section
          id="danh-muc"
          className="scroll-mt-6 border-t border-[#e7e8eb] py-9 sm:py-11"
        >
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e94f37]">
                Tìm theo nhu cầu
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">
                Danh mục sản phẩm
              </h2>
            </div>
            <ArrowDown
              className="mb-1 hidden text-[#9297a0] sm:block"
              size={19}
            />
          </div>
          {danhMucs.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#d9dce1] bg-white p-6 text-sm text-[#777c85]">
              Chưa có danh mục nào.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {danhMucs.map((danhMuc, index) => (
                <article
                  key={danhMuc.maDanhMuc}
                  className="rounded-2xl border border-[#e9eaed] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#f0b3a8] hover:shadow-md hover:shadow-[#20242c]/5"
                >
                  {/* <span
                    className={`mb-4 grid size-9 place-items-center rounded-xl text-sm font-bold ${index % 2 === 0 ? "bg-[#fff0ec] text-[#d64a34]" : "bg-[#edf2fa] text-[#45658f]"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span> */}
                  <h3 className="font-semibold">{danhMuc.tenDanhMuc}</h3>
                </article>
              ))}
            </div>
          )}
        </section>

        <section
          id="san-pham"
          className="scroll-mt-6 border-t border-[#e7e8eb]  "
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e94f37]">
                Cửa hàng
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">
                Sản phẩm nổi bật
              </h2>
            </div>
            <label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-[#e2e4e8] bg-white px-4 text-[#8b9099] transition focus-within:border-[#e94f37] sm:max-w-xs">
              <Search size={17} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm sản phẩm..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#20232a] outline-none placeholder:text-[#9ca1aa]"
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Xóa nội dung tìm kiếm"
                  onClick={() => setSearchTerm("")}
                  className="grid size-7 place-items-center rounded-full transition hover:bg-[#f0f1f3] hover:text-[#252830]"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d9dce1] bg-white px-5 py-12 text-center">
              <Search className="mx-auto mb-3 text-[#a3a8b1]" size={24} />
              <p className="font-medium">
                {sanPhams.length
                  ? "Không tìm thấy sản phẩm phù hợp."
                  : "Chưa có sản phẩm để hiển thị."}
              </p>
              {searchTerm && (
                <p className="mt-1 text-sm text-[#777c85]">
                  Thử từ khóa khác nhé.
                </p>
              )}
            </div>
          ) : (
            <Link to="/chitietsanpham">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((sanPham) => (
                  <article
                    key={sanPham.maSanPham}
                    className="group overflow-hidden rounded-2xl border border-[#e8e9ec] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#20242c]/[0.07]"
                  >
                    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-[#f1f3f6] p-5">
                      {sanPham.hinhAnh ? (
                        <img
                          src={sanPham.hinhAnh}
                          alt={sanPham.tenSanPham}
                          loading="lazy"
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <Smartphone
                          className="size-16 text-[#b2b7c0]"
                          strokeWidth={1}
                        />
                      )}
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${sanPham.soLuongTon > 0 ? "bg-white text-[#4b7259]" : "bg-[#fff0ec] text-[#c74430]"}`}
                      >
                        {sanPham.soLuongTon > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="min-h-12 font-semibold leading-6">
                        {sanPham.tenSanPham}
                      </h3>
                      {/* <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-[#777c85]">
                      {sanPham.moTa || ""}
                    </p> */}
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f0f1f3] pt-3">
                        <span className="font-bold text-[#e94f37]">
                          {formatCurrency(sanPham.giaBan)}
                        </span>
                        <span className="text-xs text-[#858a94]">
                          Kho: {sanPham.soLuongTon ?? 0}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Link>
          )}
        </section>
      </main>

      <footer className="border-t border-[#e7e8eb] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-[#777c85] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span className="font-semibold text-[#252830]">
            techline<span className="text-[#e94f37]">.</span>
          </span>
          <span>Thiết bị công nghệ cho nhịp sống mỗi ngày.</span>
        </div>
      </footer>
    </div>
  );
}

export async function DanhMucLoader() {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
    const requestOptions = {
      headers: { Accept: "application/json" },
      credentials: "include",
    };
    const [danhMucRes, sanPhamRes] = await Promise.all([
      fetch(`${baseUrl}/DanhMuc`, requestOptions),
      fetch(`${baseUrl}/SanPham`, requestOptions),
    ]);

    if (!danhMucRes.ok) {
      throw new Error(`Không thể tải danh mục (${danhMucRes.status})`);
    }
    if (!sanPhamRes.ok) {
      throw new Error(`Không thể tải sản phẩm (${sanPhamRes.status})`);
    }

    const [danhMucs, sanPhams] = await Promise.all([
      danhMucRes.json(),
      sanPhamRes.json(),
    ]);

    return { danhMucs, sanPhams };
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}
