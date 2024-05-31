import Styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .regex(/^[a-zA-Z]+$/, { message: "Must contain only letters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .regex(/^[a-zA-Z]+$/, { message: "Must contain only letters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
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
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit(onHelpSubmit)}>
          <div className={Styles.formGroup}>
            <label>First Name</label>
            <input type="text" {...register("firstName")} />
            {errors.firstName && (
              <p className={Styles.error}>{errors.firstName.message}</p>
            )}
          </div>
          <div className={Styles.formGroup}>
            <label>Last Name</label>
            <input type="text" {...register("lastName")} />
            {errors.lastName && (
              <p className={Styles.error}>{errors.lastName.message}</p>
            )}
          </div>
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
          <div className={Styles.formGroup}>
            <label>Confirm Password</label>
            <input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className={Styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit" className={Styles.submitButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
