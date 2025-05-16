"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import bcrypt from 'bcryptjs';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from 'uuid';



const Register = () => {

  const { data: session, status } = useSession();
  const router = useRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const [loading,setLoading] =useState(false)
  const onSubmit =async(data) => {
setLoading(true)
    const {name,email,password} = data;
      // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 14)
    try {
    // Add user data to Firestore
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      role:'user',
      earn:0,
      password: hashedPassword,  // Save hashed password
      creatAt:  Timestamp.now(),
      uid : uuidv4(),
    });

    if(docRef.id){
        toast.success("Create Successfully")
        router.push('/login')
    }
  } catch (e) {
      toast.error("Something went wrong!");
  }finally{
    setLoading(false)
  }
   
  };

  const password = watch("password");
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
  return null;
}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mt-1"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only alphabets and spaces allowed",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mt-1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full mt-1 pr-10"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be at least 8 characters, with uppercase, lowercase, number, and special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full mt-1 pr-10"
              {...register("confirmpassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showConfirm ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          <button disabled={loading} className="btn btn-neutral w-full">{loading?"Loading...":"Register"}</button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              className="text-blue-600 hover:underline font-medium"
              href={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
