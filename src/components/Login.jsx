import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput, Button } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../services/auth.service";
import { UserContext } from "../context/userContext";

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState, watch } = useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPasswordInfo, setShowPasswordInfo] = useState(false);
    const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
    const { isLoggedIn, login, logout } = useContext(UserContext);


    //   const email = watch("email", "");
    //   const password = watch("password", "");

    // Checking if the form is valid (email has at least 5 characters and password has at least 8 characters)
    //   useEffect(() => {
    //     const isValid = email.length >= 5 && password.length >= 8;
    //     setIsFormValid(isValid);
    //   }, [email, password]);

    const formSubmitHandler = async (body) => {

        setError(null);

        try {

            console.log(body);
            // Simulating a failed login response
            const response = await userLogin(body);

            if (response?.success) {
                toast.success("Logged in successfully!");
                login(response?.data?.user)
                localStorage.setItem("userContext", JSON.stringify(response?.data?.user))
                navigate("/");
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
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <form
                    onSubmit={handleSubmit(formSubmitHandler, validationErrorHandler)}
                    className="mt-8"
                >
                    {/* <div className="min-h-8 mt-5">
            {error?.message && (
              <p className="text-red-600 text-center ">{error.message}</p>
            )}
          </div> */}

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
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
