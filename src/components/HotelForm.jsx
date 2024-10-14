import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { addHotel } from "../services/hotel.service";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

// Joi Validation Schema
const HotelRegisterSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
  owner: Joi.string().trim().min(3).max(50).required(),
  address: Joi.object({
    city: Joi.string().min(3).max(50).required(),
    zipcode: Joi.string().min(5).max(10).regex(/^[0-9]+$/).required(),
  }).required(),
  contact: Joi.object({
    phone: Joi.string().min(10).max(15).regex(/^[0-9]+$/).required(),
    email: Joi.string().email({ tlds: { allow: false } }).lowercase().min(5).max(100).required(),
  }).required(),
  pictures: Joi.array()
    .min(3)
    .max(5),
  roomCounts: Joi.object({
    single: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
    premium: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
    deluxe: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
  }),
});

const HotelForm = () => {
    const navigate = useNavigate();
  const [fileErrors, setFileErrors] = useState([]);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: joiResolver(HotelRegisterSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit = async (data) => {
    let pictureErrors = [];
    // Validate each picture input manually
    data.pictures.forEach((picture, index) => {
        console.log(picture, index)
      if (!picture.length || picture === null) {
        pictureErrors[index] = "File is required.";
      }
    });

    // If there are errors in files, set file errors and stop submission
    if (pictureErrors.length > 0) {
      setFileErrors(pictureErrors);
      return;
    }

    setFileErrors([]);  // Reset file errors if validation passes
    console.log(data);

    const response = await addHotel(data)

    if(!response.success){
        toast.error(response?.error?.message)
    }else{
        toast.success("Hotel added successfully!")
        navigate('/admin/hotel?sort=-1')
    }
  };

  const validationErrorHandler = (error)=>{
    console.log(error)
    // setError(error)
}

  return (
    <form onSubmit={handleSubmit(onSubmit,validationErrorHandler)} className="space-y-6 p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Add Hotel</h1>

      {/* Name */}
      <div>
        <label className="block text-gray-600">Hotel Name</label>
        <input
          {...register("name")}
          className={`p-2 mt-1 block w-full border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Hotel Name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Owner */}
      <div>
        <label className="block text-gray-600">Owner</label>
        <input
          {...register("owner")}
          className={`p-2 mt-1 block w-full border rounded-md ${errors.owner ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Owner Name"
        />
        {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner.message}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-600">City</label>
        <input
          {...register("address.city")}
          className={`p-2 mt-1 block w-full border rounded-md ${errors.address?.city ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="City"
        />
        {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
      </div>

      <div>
        <label className="block text-gray-600">Zip Code</label>
        <input
          {...register("address.zipcode", {
            required: {
                value: true,
                message: "Zipcode is required",
            },
            minLength: {
                value: 5,
                message: "Contact number must be at least 6 digits",
            },
            maxLength: {
                value: 8,
                message: "Contact number cannot exceed 8 digits",
            },
            pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
            },
        })}
          
          className={`p-2 mt-1 block w-full border rounded-md ${errors.address?.zipcode ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Zip Code"
        />
        {errors.address?.zipcode && <p className="text-red-500 text-sm mt-1">{errors.address.zipcode.message}</p>}
      </div>

      {/* Contact */}
      <div>
        <label className="block text-gray-600">Phone</label>
        <input
          {...register("contact.phone", {
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
          className={`p-2 mt-1 block w-full border rounded-md ${errors.contact?.phone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Phone"
        />
        {errors.contact?.phone && <p className="text-red-500 text-sm mt-1">{errors.contact.phone.message}</p>}
      </div>

      <div>
        <label className="block text-gray-600">Email</label>
        <input
          {...register("contact.email")}
          className={`p-2 mt-1 block w-full border rounded-md ${errors.contact?.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Email"
        />
        {errors.contact?.email && <p className="text-red-500 text-sm mt-1">{errors.contact.email.message}</p>}
      </div>

      {/* Pictures */}
      <div>
        <label className="block text-gray-600">Pictures (Min:3)</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2 mb-2">
            <input
              type="file"
              {...register(`pictures.${index}`)}
              className={`p-2 border rounded-md ${fileErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
       
        <button
          type="button"
          onClick={() => append()}
          className="p-2 bg-blue-500 text-white rounded-md mt-2"
        >
          Add Picture
        </button>
        {
            <p className="text-red-500 text-sm mt-1">{errors?.pictures?.root?.message}</p>
        }
        
      </div>

      

      {/* Room Counts */}
      <div className="grid grid-cols-2 gap-4">
        {["single", "premium", "deluxe"].map((roomType) => (
          <div key={roomType}>
            <h2 className="font-medium capitalize text-gray-600">{roomType} Room</h2>
            <div>
              <label className="block text-gray-600">Price</label>
              <input
                {...register(`roomCounts.${roomType}.price`)}
                className={`p-2 mt-1 block w-full border rounded-md ${errors.roomCounts?.[roomType]?.price ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Price"
              />
              {errors.roomCounts?.[roomType]?.price && (
                <p className="text-red-500 text-sm mt-1">{errors.roomCounts[roomType].price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600">Count</label>
              <input
                {...register(`roomCounts.${roomType}.count`)}
                className={`p-2 mt-1 block w-full border rounded-md ${errors.roomCounts?.[roomType]?.count ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Count"
              />
              {errors.roomCounts?.[roomType]?.count && (
                <p className="text-red-500 text-sm mt-1">{errors.roomCounts[roomType].count.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="p-3 bg-green-500 text-white rounded-md mt-6 w-full"
      >
        Submit
      </button>
      <ToastContainer/>
    </form>
  );
};

export default HotelForm;
