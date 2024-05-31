import Styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onHelpSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className={Styles.flexContainer}>
      <div className={Styles.myContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onHelpSubmit)}>
          <div className={Styles.formGroup}>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <p className={Styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={Styles.formGroup}>
            <label>Password</label>
            <input type="password" {...register("password")} />
            {errors.password && (
              <p className={Styles.error}>{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className={Styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
