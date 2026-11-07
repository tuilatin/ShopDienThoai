import { Form, useActionData } from "react-router-dom";

const labelStyle =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const textFieldStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary";

export default function Register() {
  const actionData = useActionData();

  return (
    <Form method="POST" className="space-y-6">
      {actionData?.success && (
        <div className="text-green-500">Đăng ký thành công!</div>
      )}

      {actionData?.errors && (
        <p className="mb-4 text-sm font-medium text-red-600">
          {actionData.errors}
        </p>
      )}

      <div>
        {/* Email Field */}
        <div>
          <label htmlFor="username" className={labelStyle}>
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Your Username"
            autoComplete="username"
            required
            minLength={3}
            maxLength={50}
            className={textFieldStyle}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className={labelStyle}>
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="current-password"
            required
            minLength={8}
            maxLength={20}
            className={textFieldStyle}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelStyle}>
            Xác nhận lại mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="current-password"
            required
            minLength={8}
            maxLength={20}
            className={textFieldStyle}
          />
        </div>

        <div>
          <label htmlFor="tenKhachHang" className={labelStyle}>
            Họ và tên
          </label>
          <input
            id="tenKhachHang"
            type="text"
            name="tenKhachHang"
            autoComplete="name"
            required
            maxLength={100}
            className={textFieldStyle}
          />
        </div>

        <div>
          <label htmlFor="soDienThoai" className={labelStyle}>
            Số điện thoại
          </label>
          <input
            id="soDienThoai"
            type="tel"
            name="soDienThoai"
            autoComplete="tel"
            required
            minLength={8}
            maxLength={20}
            pattern="[0-9+()\-\s]{8,20}"
            className={textFieldStyle}
          />
        </div>

        <button
          type="submit"
          className="mt-10 border-4 border-indigo-500/100 hover:cursor-pointer"
        >
          Đăng ký
        </button>
      </div>
    </Form>
  );
}
