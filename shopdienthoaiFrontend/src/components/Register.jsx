import apiClient from "../api/apiClient";
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
          Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại.
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
            minLength={4}
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
            minLength={4}
            maxLength={20}
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

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    username: data.get("username"),
    password: data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/dangKy", registerData);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: error.response?.data?.errorMessage,
    };
  }
}
