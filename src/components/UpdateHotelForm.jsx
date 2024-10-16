import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
// import { updateRoom, getRoomDetails } from "../services/room.service"; // Assuming you have an API service to get room details
import { getHotelById, updateHotel } from "../services/hotel.service";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

// Joi Validation Schema
const UpdateHotelSchema = Joi.object({
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
  roomCounts: Joi.object({
    single: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
    premium: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
    deluxe: Joi.object({ price: Joi.number().required(), count: Joi.number().required() }),
  }),
});

const UpdateHotelForm = ({ hotelId }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: joiResolver(UpdateHotelSchema),
    defaultValues: {
      name: "",
      owner: "",
      address: { city: "", zipcode: "" },
      contact: { phone: "", email: "" },
      roomCounts: { single: { price: 0, count: 0 }, premium: { price: 0, count: 0 }, deluxe: { price: 0, count: 0 } }
    },
  });

  // Fetch room details and set them as default values
  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await getHotelById(hotelId); // Assuming roomId is passed as a prop
      console.log(response)
      if (response.success) {
        const hotelDetails = response.data.hotelDetails;

        // Set default values in the form
        setValue("name", hotelDetails.name);
        setValue("owner", hotelDetails.owner);
        setValue("address.city", hotelDetails.address.city);
        setValue("address.zipcode", hotelDetails.address.zipcode);
        setValue("contact.phone", hotelDetails.contact.phone);
        setValue("contact.email", hotelDetails.contact.email);
        setValue("roomCounts.single.price", hotelDetails.roomCounts.single.price);
        // setValue("roomCounts.single.count", hotelDetails.roomCounts.single.count);
        setValue("roomCounts.premium.price", hotelDetails.roomCounts.premium.price);
        // setValue("roomCounts.premium.count", hotelDetails.roomCounts.premium.count);
        setValue("roomCounts.deluxe.price", hotelDetails.roomCounts.deluxe.price);
        // setValue("roomCounts.deluxe.count", hotelDetails.roomCounts.deluxe.count);
      } else {
        toast.error("Failed to fetch room details.");
      }
    };

    fetchHotelDetails();
  }, [hotelId, setValue]);

  const onSubmit = async (data) => {
    console.log(hotelId,data);

    const response = await updateHotel(hotelId, data);

    console.log(response)

    if (!response.success) {
      toast.error(response?.error?.message);
    } else {
      toast.success("Hotel updated successfully!");
      navigate(`/admin/viewhotel/${hotelId}`);
    }
  };

  const validationErrorHandler = (error) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, validationErrorHandler)} className="space-y-6 p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Update Hotel</h1>

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
          {...register("address.zipcode")}
          className={`p-2 mt-1 block w-full border rounded-md ${errors.address?.zipcode ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Zip Code"
        />
        {errors.address?.zipcode && <p className="text-red-500 text-sm mt-1">{errors.address.zipcode.message}</p>}
      </div>

      {/* Contact */}
      <div>
        <label className="block text-gray-600">Phone</label>
        <input
          {...register("contact.phone")}
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

      {/* Room Counts */}
      <div className="text-xl font-bold">Add More Rooms</div>
      <div className="grid grid-cols-2 gap-4">
        {["single", "premium", "deluxe"].map((roomType) => (
          <div key={roomType}>
            <h2 className="font-medium capitalize text-gray-600">{roomType} Room</h2>
            <div>
              <label className="block text-gray-600">Price</label>
              <input
                {...register(`roomCounts.${roomType}.price`)}
                className={`p-2 mt-1 block w-full border rounded-md ${errors.roomCounts?.[roomType]?.price ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-300`}
                placeholder="Price"
                disabled={true}
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
        className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
      >
        Update Hotel
      </button>

      {/* <ToastContainer /> */}
    </form>
  );
};

export default UpdateHotelForm;
