import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import SuaSanPham from "./SuaSanPham";
import ThemSanPham from "./ThemSanPham";

const DEFAULT_PAGE_SIZE = 5;
const ALLOWED_PAGE_SIZES = new Set([5, 10, 20]);

function ProductSearchForm({ search, categories, onSearch, onClear }) {
  const [searchName, setSearchName] = useState(search.tenSanPham);
  const [searchCategory, setSearchCategory] = useState(search.maDanhMuc);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchName.trim(), searchCategory);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto_auto]"
    >
      <label className="flex flex-col gap-1 text-sm font-medium">
        Tìm theo tên
        <input
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
          placeholder="Nhập tên sản phẩm"
          className="rounded border border-slate-300 px-3 py-2 font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Danh mục
        <select
          value={searchCategory}
          onChange={(event) => setSearchCategory(event.target.value)}
          className="rounded border border-slate-300 px-3 py-2 font-normal"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((danhMuc) => (
            <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
              {danhMuc.tenDanhMuc}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="self-end rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Tìm kiếm
      </button>
      <button
        type="button"
        onClick={onClear}
        className="self-end rounded border border-slate-300 px-4 py-2 hover:bg-slate-50"
      >
        Xóa lọc
      </button>
    </form>
  );
}

function getPaginationItems(totalPages, currentPage) {
  const visiblePages = new Set([0, totalPages - 1]);

  for (
    let pageNumber = Math.max(0, currentPage - 2);
    pageNumber <= Math.min(totalPages - 1, currentPage + 2);
    pageNumber += 1
  ) {
    visiblePages.add(pageNumber);
  }

  const sortedPages = [...visiblePages].sort((first, second) => first - second);
  return sortedPages.reduce((items, pageNumber, index) => {
    if (index > 0 && pageNumber - sortedPages[index - 1] > 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${pageNumber}` });
    }
    items.push({ type: "page", pageNumber });
    return items;
  }, []);
}

export default function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sanPhams, setSanPhams] = useState([]);
  const [danhMucs, setDanhMucs] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const parsedPage = Number.parseInt(searchParams.get("page") ?? "0", 10);
  const page = Number.isInteger(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
  const parsedPageSize = Number.parseInt(
    searchParams.get("size") ?? String(DEFAULT_PAGE_SIZE),
    10,
  );
  const pageSize = ALLOWED_PAGE_SIZES.has(parsedPageSize)
    ? parsedPageSize
    : DEFAULT_PAGE_SIZE;
  const appliedSearch = {
    tenSanPham: searchParams.get("tenSanPham") ?? "",
    maDanhMuc: searchParams.get("maDanhMuc") ?? "",
  };

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get("/danhmuc")
      .then((response) => {
        if (isMounted) {
          setDanhMucs(response.data);
        }
      })
      .catch((error) => {
        console.error("Lỗi tải danh mục:", error);
        if (isMounted) {
          setErrorMessage("Không tải được danh mục để lọc sản phẩm.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get("/sanpham", {
        params: {
          tenSanPham: appliedSearch.tenSanPham,
          maDanhMuc: appliedSearch.maDanhMuc,
          page,
          size: pageSize,
        },
      })
      .then((response) => {
        if (isMounted) {
          const totalPages = response.data.totalPages ?? 0;
          if (page >= Math.max(totalPages, 1)) {
            const lastValidPage = Math.max(totalPages - 1, 0);
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set("page", String(lastValidPage));
            setSearchParams(nextParams, { replace: true });
          }
          setSanPhams(response.data.content ?? []);
          setPageInfo({
            totalPages,
            totalElements: response.data.totalElements ?? 0,
            first: response.data.first ?? true,
            last: response.data.last ?? true,
          });
        }
      })
      .catch((error) => {
        console.error("Lỗi tải sản phẩm:", error);
        if (isMounted) {
          setErrorMessage(
            "Không thể tải danh sách sản phẩm. Vui lòng thử lại.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    appliedSearch.maDanhMuc,
    appliedSearch.tenSanPham,
    page,
    pageSize,
    refreshKey,
    searchParams,
    setSearchParams,
  ]);

  const updateSearchParams = (name, category) => {
    setIsLoading(true);
    setErrorMessage("");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      if (name) {
        nextParams.set("tenSanPham", name);
      } else {
        nextParams.delete("tenSanPham");
      }
      if (category) {
        nextParams.set("maDanhMuc", category);
      } else {
        nextParams.delete("maDanhMuc");
      }
      nextParams.set("page", "0");
      nextParams.set("size", String(pageSize));
      return nextParams;
    });
  };

  const handleClearSearch = () => {
    updateSearchParams("", "");
  };

  const refreshProducts = () => {
    setIsLoading(true);
    setErrorMessage("");
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const handlePageChange = (nextPage) => {
    setIsLoading(true);
    setErrorMessage("");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("page", String(nextPage));
      nextParams.set("size", String(pageSize));
      return nextParams;
    });
  };

  const handlePageSizeChange = (nextPageSize) => {
    setIsLoading(true);
    setErrorMessage("");
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("page", "0");
      nextParams.set("size", String(nextPageSize));
      return nextParams;
    });
  };

  useEffect(() => {
    const invalidPage =
      searchParams.has("page") && String(page) !== searchParams.get("page");
    const invalidPageSize =
      searchParams.has("size") && String(pageSize) !== searchParams.get("size");
    if (invalidPage || invalidPageSize) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(page));
      nextParams.set("size", String(pageSize));
      setSearchParams(nextParams, { replace: true });
    }
  }, [page, pageSize, searchParams, setSearchParams]);

  const handleProductCreated = () => {
    setIsAddProduct(false);
    setIsLoading(true);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("page", "0");
      nextParams.set("size", String(pageSize));
      return nextParams;
    });
    refreshProducts();
  };

  const handleProductUpdated = () => {
    setEditingProduct(null);
    refreshProducts();
  };

  const handleDelete = async (sanPham) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm "${sanPham.tenSanPham}" (${sanPham.maSanPham}) không?`,
    );
    if (!confirmed) {
      return;
    }

    setDeletingProduct(sanPham.maSanPham);
    setErrorMessage("");
    try {
      await apiClient.delete(`/sanpham/${sanPham.maSanPham}`);
      if (sanPhams.length === 1 && page > 0) {
        setIsLoading(true);
        handlePageChange(page - 1);
      } else {
        refreshProducts();
      }
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      setErrorMessage(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Không thể xóa sản phẩm. Vui lòng thử lại.",
      );
    } finally {
      setDeletingProduct(null);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Quản lý sản phẩm</h1>

      {errorMessage && (
        <p
          role="alert"
          className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <ProductSearchForm
        key={searchParams.toString()}
        search={appliedSearch}
        categories={danhMucs}
        onSearch={updateSearchParams}
        onClear={handleClearSearch}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsAddProduct(true);
          }}
          aria-expanded={isAddProduct}
          className="cursor-pointer rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
        <label className="flex items-center gap-2 text-sm">
          Số sản phẩm mỗi trang
          <select
            value={pageSize}
            onChange={(event) => {
              handlePageSizeChange(Number(event.target.value));
            }}
            className="rounded border border-slate-300 px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      {isAddProduct && (
        <ThemSanPham
          onCancel={() => setIsAddProduct(false)}
          onProductCreated={handleProductCreated}
        />
      )}
      {editingProduct && (
        <SuaSanPham
          key={editingProduct.maSanPham}
          sanPham={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3">Mã sản phẩm</th>
              <th className="px-5 py-3">Tên sản phẩm</th>
              <th className="px-5 py-3">Mã danh mục</th>
              <th className="px-5 py-3">Tên danh mục</th>
              <th className="px-5 py-3">Giá bán</th>
              <th className="px-5 py-3">Số lượng tồn</th>
              <th className="px-5 py-3">Hình ảnh</th>
              <th className="px-5 py-3">Mô tả</th>
              <th className="px-5 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-5 py-6 text-center">
                  Đang tải sản phẩm...
                </td>
              </tr>
            ) : sanPhams.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-6 text-center">
                  Không tìm thấy sản phẩm.
                </td>
              </tr>
            ) : (
              sanPhams.map((sanPham) => (
                <tr
                  key={sanPham.maSanPham}
                  className="border-b border-slate-200"
                >
                  <td className="px-5 py-3 font-medium">{sanPham.maSanPham}</td>
                  <td className="px-5 py-3 font-medium">
                    {sanPham.tenSanPham}
                  </td>
                  <td className="px-5 py-3">{sanPham.maDanhMuc}</td>
                  <td className="px-5 py-3">{sanPham.tenDanhMuc}</td>
                  <td className="px-5 py-3">
                    {Number(sanPham.giaBan ?? 0).toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-5 py-3">{sanPham.soLuongTon}</td>
                  <td className="px-5 py-3">
                    {sanPham.hinhAnh ? (
                      <img
                        src={sanPham.hinhAnh}
                        alt={sanPham.tenSanPham}
                        className="h-16 w-16 object-cover"
                      />
                    ) : (
                      <span className="text-slate-400">Chưa có ảnh</span>
                    )}
                  </td>
                  <td className="max-w-xs px-5 py-3">{sanPham.moTa}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddProduct(false);
                          setEditingProduct(sanPham);
                        }}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(sanPham)}
                        disabled={deletingProduct === sanPham.maSanPham}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-60"
                      >
                        {deletingProduct === sanPham.maSanPham
                          ? "Đang xóa..."
                          : "Xóa"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Tổng {pageInfo.totalElements} sản phẩm
          {pageInfo.totalPages > 0 &&
            ` — Trang ${page + 1}/${pageInfo.totalPages}`}
        </p>
        {pageInfo.totalPages > 1 && (
          <nav
            aria-label="Phân trang sản phẩm"
            className="flex flex-wrap items-center gap-1"
          >
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={pageInfo.first || isLoading}
              className="rounded bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹ Prev
            </button>
            {getPaginationItems(pageInfo.totalPages, page).map((item) =>
              item.type === "ellipsis" ? (
                <span
                  key={item.key}
                  aria-hidden="true"
                  className="px-2 py-2 text-slate-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item.pageNumber}
                  type="button"
                  onClick={() => handlePageChange(item.pageNumber)}
                  disabled={isLoading}
                  aria-label={`Trang ${item.pageNumber + 1}`}
                  aria-current={page === item.pageNumber ? "page" : undefined}
                  className={`min-w-10 rounded px-3 py-2 ${
                    page === item.pageNumber
                      ? "bg-orange-100 text-orange-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {item.pageNumber + 1}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={pageInfo.last || isLoading}
              className="rounded bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next ›
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
