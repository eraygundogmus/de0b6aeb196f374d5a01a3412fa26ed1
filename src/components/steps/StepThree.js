import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bar from "../bar/Bar";
import "./StepThree.scss";
import Button from "../button/Button";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Coupons from "../../api/services/Coupon";
import Bookings from "../../api/services/Bookings";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepThreeSchema } from "../../utils/couponSchema";
import PaymentCard from "react-payment-card-component";

import { setStep } from "../stepper/stepperSlice";

function StepThree() {
  const dispatch = useDispatch();

  const [flipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({});
  const stepper = useSelector((state) => state.stepper);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState({});
  const [isMount, setMount] = useState(false);
  const [price, setPrice] = useState(0);
  const [isCouponSubmitted, setIsCouponSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepThreeSchema),
  });

  const onCouponSubmit = async (data) => {
    const submitCoupon = async () =>
      await Coupons.fetchViaCode(data.coupon_code).then((res) => {
        if (res.data.length === 1) {
          const exp_date = res.data[0].expiration_at;
          const today = dayjs();
          dayjs.extend(isSameOrBefore);
          const isValid = dayjs(today).isSameOrBefore(exp_date, "day");

          if (isValid & !isCouponSubmitted) {
            setPrice(price - res.data[0].discount_ammount);
            setIsCouponSubmitted(true);
          } else {
            setError("coupon_code", {
              message: "Bu kuponun tarihi geçmiş.",
            });
          }
          if (isCouponSubmitted) {
            setError("coupon_code", {
              message: "Kupon kodunuz zaten uygulandı.",
            });
          }
        } else {
          setError("coupon_code", {
            type: "focus",
            message: "Hatalı kupon kodu.",
          });
        }
      });
    if (data.coupon_code) {
      submitCoupon();
    }
    const payload = {
      hotel_id: formData.hotel_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      adult: formData.adult,
      child: formData.child,
      room_type: formData.room_type,
      room_scenic: formData.room_scenic,
      price: price,
      coupon_code: isCouponSubmitted && data.coupon_code,
      card_name: data.card_name,
      card_number: data.card_number,
      card_date_month: data.card_date_month,
      card_date_year: data.card_date_year,
      card_cvv: data.card_cvv,
    };
    const submitForm = async (a) => {
      await Bookings.create(a)
        .then((res) => {
          if (res.statusText === "Created") {
            const localStorageObj = { step: 3, payload: a };

            localStorage.setItem("formState", JSON.stringify(localStorageObj));

            dispatch(setStep(3));
          }
        })
        .catch((err) => console.log(err));
    };
    submitForm(payload);
  };

  useEffect(() => {
    const formState = JSON.parse(localStorage.getItem("formState"));
    setFormData(formState.payload);
    if (stepper.hotelsDetails.length & stepper.hotels.length) {
      let selectedHotel = stepper.hotelsDetails.filter(
        (item) => item.hotel_id == formState.payload.hotel_id
      )[0];
      setSelectedHotelDetails(selectedHotel);

      const priceForNight =
        selectedHotel?.room_type[formState.payload.hotel_id]?.price;

      const priceRate =
        selectedHotel?.room_scenic[formState.payload.hotel_id]?.price_rate;

      const totalCostForOneNight =
        priceForNight + (priceRate / 100) * priceForNight;

      const day1 = dayjs(formState.payload.start_date);
      const day2 = dayjs(formState.payload.end_date);
      const diff = day1.diff(day2, "day") * -1;

      const totalCostOfBooking = diff * totalCostForOneNight;

      setPrice(totalCostOfBooking);
      setMount(true);
    }
  }, [stepper]);

  return (
    <div>
      <Bar
        hotelName={formData.hotel_name}
        formData={formData}
        selectedHotelDetails={selectedHotelDetails}
      />
      <div className="payment-rest">
        {isMount && selectedHotelDetails?.room_type[formData.hotel_id]?.title}
        &nbsp;tipli ve &nbsp;
        {isMount && selectedHotelDetails?.room_scenic[formData.hotel_id]?.title}
        &nbsp;oda için seçim yaptınız.
        <div className="upper">
          <div>
            <form onSubmit={handleSubmit(onCouponSubmit)}>
              <input
                {...register("coupon_code")}
                placeholder="Kupon Kodu"
                className="coupon"
                disabled={isCouponSubmitted}
              />
              <input
                disabled={isCouponSubmitted}
                className="coupon-submit-btn"
                type="submit"
              />
            </form>
            <p className="coupon_form_err">
              {errors.coupon_code?.message}
              {isCouponSubmitted && <p className="green"> Kupon uygulandı!</p>}
            </p>
          </div>

          <div className="price">Toplam Tutar: {price} TL</div>
        </div>
        <div className="lower">
          <div onClick={() => setFlipped(!flipped)}>
            <PaymentCard
              bank="normal"
              model="personnalite"
              type="black"
              brand="mastercard"
              number={watch("card_number")}
              cvv={watch("card_cvv")}
              holderName={watch("card_name")}
              expiration={
                watch("card_date_month") + "/" + watch("card_date_year")
              }
              flipped={flipped}
            />
            <p className="card-flip-message">
              Karta tıklayarak çevirebilirsiniz.
            </p>
          </div>

          <form className="card-form" onSubmit={handleSubmit(onCouponSubmit)}>
            <label className="card-form-element form-span-4">
              İsim Soyisim <input {...register("card_name")} />
              <p className="card-form-errors"> {errors.card_name?.message}</p>
            </label>
            <label className="card-form-element form-span-4">
              Kart Numarası
              <input maxLength="16" {...register("card_number")} />
              <p> {errors.card_number?.message}</p>
            </label>
            <label className="card-form-element form-span-1">
              Ay
              <select {...register("card_date_month")}>
                {[
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ].map((el, index) => (
                  <option key={"gecerlilik,ay" + index} value={index + 1}>
                    {el}
                  </option>
                ))}
              </select>
            </label>
            <label className="card-form-element form-span-1">
              Yıl
              <select {...register("card_date_year")}>
                {[
                  "2021",
                  "2022",
                  "2023",
                  "2024",
                  "2025",
                  "2026",
                  "2027",
                  "2028",
                  "2029",
                  "2030",
                  "2031",
                  "2032",
                  "2033",
                ].map((el) => (
                  <option key={"gecerlilik" + el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </label>
            <label className="card-form-element form-span-2">
              CVV <input maxLength="3" {...register("card_cvv")} />
              <p> {errors.card_cvv?.message}</p>
            </label>
          </form>
        </div>
      </div>
      <div className="step-2_buttons form-bg">
        <div
          onClick={() => {
            dispatch(setStep(1));
          }}
        >
          <Button> &#x2190; Önceki Adım </Button>
        </div>

        <div onClick={handleSubmit(onCouponSubmit)}>
          <Button>Öde ve Bitir</Button>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
