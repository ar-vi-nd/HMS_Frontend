

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Profile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit ,formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNo: user?.phoneNo,
    },
  });

  const onSubmit = (data) => {
    onUpdate(user?._id,data);  // Call the passed in onUpdate function
    setIsEditing(false);  // Close the editing mode
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {!isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact No</label>
            <p className="mt-1 text-lg text-gray-900">{user?.phoneNo}</p>
          </div>
          <div className="flex justify-end">
           { !user?.isAdmin && <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name Required",
                },
                validate: {
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
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
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact No.</label>
            <input
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className=" text-red-500 min-h-6">
                            {errors && errors?.phoneNo?.message}
                        </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

