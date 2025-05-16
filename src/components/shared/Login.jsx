"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLaoding] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLaoding(true)
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res.ok) {
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
     
      toast.error("Server down try again later")
    } finally {

      setLaoding(false)
    }


  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm">
        <h3 className="text-center text-3xl font-bold">Login</h3>
        <div className="bg-base-100 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full space-y-4">
            <label className="floating-label">
              <span>Email</span>
              <input
                type="text"
                placeholder="Email"
                className="input input-md w-full"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && <span className="text-red-500">This field is required</span>}

            <label className="floating-label">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="input input-md w-full"
              />
            </label>
            {errors.password && <span className="text-red-500">This field is required</span>}

            <button disabled={loading} className="btn btn-neutral mt-4">{loading ? "Loading..." : "Login"}</button>
            <p><Link className="link text-blue-500 font-bold" href={'/terms'}>Terms</Link> & <Link className="link font-bold text-blue-500" href={'/privacy&policy'}>Privacy Policy</Link></p>
            <p>
              Create account{" "}
              <Link className="link text-[#0053a5] font-medium" href={"/signup"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
