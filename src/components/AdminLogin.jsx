
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput, Button } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../services/auth.service";
import { UserContext } from "../context/userContext";

const AdminLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState, watch } = useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPasswordInfo, setShowPasswordInfo] = useState(false);
    const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
    const {user, isLoggedIn, login, logout } = useContext(UserContext);

    const formSubmitHandler = async (body) => {

        setError(null);

        try {

            console.log(body);
            const response = await adminLogin(body);

            if (response?.success) {
                toast.success("Logged in successfully!");
                login(response?.data?.admin)
                localStorage.setItem("userContext", JSON.stringify(response?.data?.admin))
                const redirectTo = new URLSearchParams(window.location.search).get("redirectTo")||"";
                console.log(redirectTo);
                if (redirectTo) {
                    navigate(redirectTo);
                } else {
                    navigate("/admin");
                }
            }
            if (!response?.success) {
                toast.error(response?.error?.message
                );
            }
        }
        catch (error) {
            toast.error("Internal Server Error, Please try after some time");
        }
    };

    const validationErrorHandler = (error) => {
        console.log(error);
        setError(error);
    };

    useEffect(()=>{
        const storedUser = localStorage.getItem('userContext');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.isAdmin) {
        navigate("/admin");
      }
    }
    },[])

    
  return (
    <div className="flex items-center justify-center w-full mt-12">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%"></Logo> */}
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Admin Login
                </h2>

                <form
                    onSubmit={handleSubmit(formSubmitHandler, validationErrorHandler)}
                    className="mt-8"
                >

                    <div className="space-y-1">
                        <FormInput
                            placeholder="Enter Your Email"
                            type="text"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email Required",
                                },
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid  address",
                                },
                            })}
                        />

                        <div className=" text-red-500 min-h-6">
                            {error && error.email?.message}
                        </div>

                        <FormInput
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password Required",
                                },
                            })}
                        />

                        <div className=" text-red-500 min-h-6">
                            {error && error.password?.message}
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            {" "}
                            Sign In
                        </Button>
                    </div>
                </form>
                {/* <ToastContainer /> */}
            </div>
        </div>
    );
}

export default AdminLogin
