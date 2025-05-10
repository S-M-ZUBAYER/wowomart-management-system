import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CouponUserDetails = () => {
  const [couponUser, setCouponUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { state } = useLocation();
  const userID = state?.id;
  console.log(userID);

  useEffect(() => {
    if (!userID) return;

    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(
          `https://grozziie.zjweiting.com:57683/tht/shopify/couponUserList/${userID}`
        );
        const sellerData = response?.data?.result.result || [];
        setCouponUser(sellerData);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerDetails();
  }, [userID]);

  if (isLoading) {
    return (
      <CenteredMessage
        message="Loading seller details..."
        color="text-gray-600"
      />
    );
  }

  if (!couponUser) {
    return (
      <CenteredMessage
        message="Seller details not found."
        color="text-red-500"
      />
    );
  }

  const fields = [
    { label: "Customer ID", value: couponUser.customerId },
    { label: "Email", value: couponUser.email },
    { label: "Coupon Title", value: couponUser.title },
    { label: "Tag", value: couponUser.tag },
    { label: "SegmentQuery", value: couponUser.segmentQuery },
    { label: "segmentId", value: couponUser.segmentId },
    { label: "percentage", value: couponUser.percentage },
    { label: "minimumItem", value: couponUser.minimumItem },
    { label: "minimumAmount", value: couponUser.minimumAmount },
    { label: "ID", value: couponUser.id },
    { label: "expireDate", value: couponUser.expireDate },
    { label: "DiscountId", value: couponUser.discountId },
    { label: "Created At", value: couponUser.created_at },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-6">
        Coupon User Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <DetailItem key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <p className="text-gray-700">
    <span className="font-semibold">{label}:</span> {value ?? "-"}
  </p>
);

const CenteredMessage = ({ message, color }) => (
  <div className="flex items-center justify-center h-screen">
    <p className={`text-lg ${color}`}>{message}</p>
  </div>
);

export default CouponUserDetails;
