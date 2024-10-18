import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput, Button, Input, Checkbox } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignup } from "../services/auth.service";

const Signup = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState, watch } = useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPasswordInfo, setShowPasswordInfo] = useState(false);
    const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

    const email = watch("email", "");
    const password = watch("password", "");

    // Checking if the form is valid (email has at least 5 characters and password has at least 8 characters)
    useEffect(() => {
        const isValid = email.length >= 5 && password.length >= 8;
        setIsFormValid(isValid);
    }, [email, password]);

    const formSubmitHandler = async (body) => {
        console.log(body);

        const response = await userSignup(body);

        console.log(response);

        if (!response.success) {
            toast.error(response?.error?.message);
            setError({ message: response?.error?.message });
        }
        if(response.success) {
            toast.success("Signup Successful.")
        navigate("/login")
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
                    Sign Up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
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
                            placeholder="Enter Your Name"
                            type="text"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name Required",
                                },
                                validate: {},
                            })}
                        />
                        <div className=" text-red-500 min-h-6">
                            {error && error.name?.message}
                        </div>
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
                            type={showPasswordInfo ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password Required",
                                },
                                validate: {
                                    matchPattern: (value) =>
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                                            value
                                        ) ||
                                        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                                },
                            })}
                        />
                        <div className="flex items-center justify-between">
                            <Checkbox
                                label={"show password"}
                                value={showPasswordInfo}
                                setValue={setShowPasswordInfo}
                            ></Checkbox>
                            <Button
                                type={"button"}
                                className={"bg-gray-200 px-2 mr-2 rounded-md hover:bg-gray-400"}
                            >
                                i
                            </Button>
                        </div>

                        <div className=" text-red-500 min-h-6">
                            {error && error.password?.message}
                        </div>

                        <FormInput
                            type="text"
                            placeholder="Enter your contact number"
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Contact number is required",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Contact number must be at least 10 digits",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Contact number cannot exceed 15 digits",
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers are allowed",
                                },
                            })}
                        />

                        <div className=" text-red-500 min-h-6">
                            {error && error?.phoneNo?.message}
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            Sign Up
                        </Button>
                    </div>
                </form>

                {/* <ToastContainer /> */}
            </div>
        </div>
    );
};

export default Signup;
