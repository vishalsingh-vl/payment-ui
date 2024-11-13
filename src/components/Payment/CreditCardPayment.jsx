import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactComponent as Mastercard } from "./mastercard.svg";
import { ReactComponent as Visa } from "./visa.svg";
import { ReactComponent as VisaDebit } from "./visa-debit.svg";
import { ReactComponent as MastercardDebit } from "./mastercard-debit.svg";
import { useCollapse } from "react-collapsed";
import Select from "react-select";
import "./payment.scss";
import countryWithProvinces from "./country-options";

const schema = yup.object().shape({
  cardNumber: yup.string().min(16).max(19).required("Card number is required"),
  expirationDate: yup.string().required("Expiration date is required"),
  cvv: yup.string().min(3).max(4).required("CVV is required"),
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required")
    .test("first-name", "First name is required", (value) => {
      const names = value.split(" ");
      return names.length > 0;
    })
    .test("last-name", "Last name is required", (value) => {
      const names = value.split(" ");
      return names.length > 1;
    }),
  postalCode: yup
    .string()
    .max(11, "Postal code must be 11 characters or less")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Postal code can only contain letters and numbers"
    )
    .required("Postal code is required"),
  city: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "City can only contain letters and numbers")
    .required("Postal code is required"),
  billingAddress: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s-/']*$/,
      "Billing address can only contain letters, numbers, spaces, hyphens, forward slashes, and apostrophes"
    )
    .required("Billing address is required"),
  country: yup.string().required("Country is required"),
  province: yup.string().required("Province is required"),
  month: yup.string().required("Month is required"),
  year: yup.string().required("Year is required"),
});

const selectStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
    fontSize: "14px",
    marginTop: "8px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#212529",
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    minHeight: "44px",
    border: "1px solid #D4D4D4",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #8C0AC8",
      padding: 0,
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    visibility: "hidden",
  }),
  menu: (provided) => ({
    ...provided,
    color: "#262626",
    fontWeight: 600,
  }),
  option: (base) => ({
    ...base,
    "&:hover": {
      backgroundColor: "#f4e7fa",
    },
    "&:focus": {
      backgroundColor: "#f4e7fa",
      border: "1px solid purple",
    },
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#D4D4D4",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};

const monthOptions = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Feb",
    value: 2,
  },
  {
    label: "Mar",
    value: 3,
  },
  {
    label: "Apr",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "Jul",
    value: 7,
  },
  {
    label: "Aug",
    value: 8,
  },
  {
    label: "Sept",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Dec",
    value: 12,
  },
];

const generateNextTenYears = () => {
  let currentYear = new Date().getFullYear();
  const years = [
    {
      label: `${currentYear}`,
      value: currentYear,
      name: currentYear,
    },
  ];

  for (let i = 0; i < 10; i++) {
    years.push({
      label: `${currentYear + 1}`,
      value: currentYear + 1,
    });

    currentYear += 1;
  }
  return years;
};

const yearOptions = generateNextTenYears();

const CreditCardForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [inputValue, setInputValue] = useState("");
  const [maskedValue, setMaskedValue] = useState("");
  const [showHelper, setShowHelper] = useState(false);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const maskedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1-")
      .replace(/-$/, "");
    setMaskedValue(maskedValue);
    setInputValue(value);
  };

  console.log(errors);

  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <label className="is-required" htmlFor="name-on-card">
          Name on card
        </label>
        <input
          className={errors.name ? "error" : ""}
          {...register("name")}
          placeholder="Eg: JOHN DOE"
          id="name-on-card"
        />
        <p className="helper-text">
          If your name contains "-" use space and if " ' " remove
        </p>
      </div>
      <div className="row">
        <label className="is-required" htmlFor="card-number">
          Card number
        </label>
        <input
          className={errors.cardNumber ? "error" : ""}
          placeholder="0000-0000-0000-0000"
          id="card-number"
          {...register("cardNumber")}
          onChange={handleInputChange}
          value={maskedValue}
        />
        {showHelper && (
          <p className="helper-text">
            Input field with example helper text (built into the component)
          </p>
        )}
      </div>
      <div className="row">
        <label className="is-required" htmlFor="expiration-date">
          Expiration date
        </label>
        <div id="expiration-date">
          <Controller
            control={control}
            render={({ field }) => (
              <Select
                styles={selectStyles}
                placeholder={<span>Month</span>}
                isSearchable={true}
                options={monthOptions}
              />
            )}
            name="year"
          />

          <Controller
            control={control}
            render={({ field }) => (
              <Select
                styles={selectStyles}
                placeholder={<span>Year</span>}
                isSearchable={true}
                options={yearOptions}
              />
            )}
            name="year"
          />

          <div>
            <input
              className={`cvc ${errors.cvv ? "error" : ""}`}
              placeholder="CVC"
              id="cvc"
              maxL="999"
              type="number"
              {...register("cvv")}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <label className="is-required" htmlFor="billing-details">
          Billing details
        </label>
        <input
          className={`${errors.billingAddress ? "error" : ""}`}
          placeholder="Enter billing address"
          id="billing-details"
          {...register("billingAddress")}
        />
      </div>
      <div className="row grid">
        <div>
          <label className="is-required" htmlFor="city">
            City
          </label>
          <input
            className={errors.city ? "error" : ""}
            placeholder="Enter city"
            id="city"
            {...register("city")}
          />
        </div>
        <div>
          <label className="is-required" htmlFor="postal-code">
            Postal code
          </label>
          <input
            className={errors.postalCode ? "error" : ""}
            placeholder="Enter postal code"
            id="postal-code"
            {...register("postalCode")}
          />
        </div>
      </div>

      <div className="row">
        <label className="country-label is-required" htmlFor="country">
          Country
        </label>
        <div className="country-section">
          <Select
            {...register("country")}
            className={errors.country ? "error" : ""}
            styles={selectStyles}
            placeholder={<span>Country</span>}
            isSearchable={true}
            options={countryWithProvinces}
            value={country}
            onChange={(e) => {
              setCountry(e);
              setProvince("");
            }}
          />
          <Select
            className={errors.province ? "error" : ""}
            styles={selectStyles}
            placeholder={<span>Province</span>}
            isSearchable={true}
            options={country.provinces}
            value={province}
            onChange={(e) => setProvince(e)}
            // {...register('province')}
          />
        </div>
      </div>
      {/* <div className="row">
        <label htmlFor="phone-number" className="is-required">
          Phone number
        </label>
        <input placeholder="Enter your phone number" id="phone-number" />
      </div>
      <div className="row">
        <label htmlFor="email" className="is-required">
          Email
        </label>
        <input placeholder="example@email.com" id="email" />
      </div> */}
    </form>
  );
};

const ErrorAlertBanner = ({ title, description }) => (
  <div className="error-alert">
    <p className="error-heading">{title}</p>
    <p>{description}</p>
  </div>
);

const CreditCardPayment = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const onSubmit = async (data) => {
    console.log("Payment processed:", data);
  };

  return (
    <div className="accordian">
      <input
        type="checkbox"
        name="radio-group"
        id="radio"
        className="radio-input"
        checked={isExpanded}
      />
      <button
        className="title-button"
        type="checkbox"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <label for="radio" class="radio-label">
          <span
            class={`radio-inner-circle ${isExpanded ? "checked" : ""}`}
          ></span>
          Pay with credit card
        </label>
      </button>
      <section {...getCollapseProps()}>
        <div className="row icon-tray">
          <Visa className={`${false ? "selected-card" : ""}`} />
          <Mastercard className={`${false ? "selected-card" : ""}`} />
          <VisaDebit className={`${true ? "selected-card" : ""}`} />
          <MastercardDebit className={`${false ? "selected-card" : ""}`} />
        </div>
        {false ? (
          <div className="row">
            <ErrorAlertBanner
              title="Card Type Error"
              description="We cannot find this card type. Please try again with a different card."
            />
          </div>
        ) : null}
        <CreditCardForm />
      </section>
    </div>
  );
};

export default CreditCardPayment;
