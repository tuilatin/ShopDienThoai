import { Form, Link, redirect } from "react-router-dom";
import { useActionData } from "react-router-dom";
import apiClient from "../api/apiClient";

const labelStyle =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const textFieldStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary";

export default function Login() {
  const actionData = useActionData();

  return (
    <>
      <Form method="POST" className="space-y-6">
        {/* Email Field */}
        {actionData?.success && (
          <div className="text-green-500">Đăng nhập thành công!</div>
        )}

        {actionData?.errors && (
          <p className="mb-4 text-sm font-medium text-red-600">
            Đăng nhập thất bại. Tên đăng nhập hoặc mật khẩu không đúng.
          </p>
        )}

        <div>
          <label htmlFor="username" className={labelStyle}>
            Tài Khoản{" "}
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
            Mật Khẩu
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

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-10 border-4 border-indigo-500/100 hover:cursor-pointer"
        >
          Đăng Nhập
        </button>
      </Form>

      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
        Chưa có tài khoản?{" "}
      </p>
      <Link
        to="/register"
        className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
      >
        Đăng kí ở đây
      </Link>
    </>
  );
}

export async function loginAction({ request }) {
  const loginFormData = await request.formData();
  const loginData = {
    username: loginFormData.get("username"),
    password: loginFormData.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/dangnhap", loginData);
    return redirect("/"); // Redirect to the home page after successful login
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
}
