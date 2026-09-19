import { Form } from "react-router-dom";

const labelStyle =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const textFieldStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary";

export default function Login() {
  return (
    <Form method="POST" className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="username" className={labelStyle}>
          Username
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
          Password
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
    </Form>
  );
}
