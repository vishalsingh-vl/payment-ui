import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactComponent as Mastercard } from "./mastercard.svg";
import { ReactComponent as Visa } from "./visa.svg";
import { ReactComponent as VisaDebit } from "./visa-debit.svg";
import { ReactComponent as MastercardDebit } from "./mastercard-debit.svg";
import Select from "react-select";
import "./payment.scss";

const schema = yup.object().shape({
  cardNumber: yup.string().required("Card number is required"),
  expirationDate: yup.string().required("Expiration date is required"),
  cvv: yup.string().required("CVV is required"),
  name: yup.string().required("Name is required"),
  cardType: yup.string().required("Card type is required"),
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

const yearOptions = [
  {
    label: "2024",
    value: 2024,
  },
  {
    label: "2025",
    value: 2025,
  },
  {
    label: "2026",
    value: 2026,
  },
  {
    label: "2027",
    value: 2027,
  },
  {
    label: "2028",
    value: 2028,
  },
];

const CreditCardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form>
      <div className="row">
        <label className="is-required" htmlFor="name-on-card">
          Name on card
        </label>
        <input placeholder="Eg: JOHN DOE" id="name-on-card" />
      </div>
      <div className="row">
        <label className="is-required" htmlFor="card-number">
          Card number
        </label>
        <input placeholder="0000-0000-0000" id="card-number" />
      </div>
      <div className="row">
        <label className="is-required" htmlFor="expiration-date">
          Expiration date
        </label>
        <div id="expiration-date">
          <Select
            styles={selectStyles}
            placeholder={<span>Month</span>}
            isSearchable={true}
            options={monthOptions}
          />
          <Select
            styles={selectStyles}
            placeholder={<span>Year</span>}
            isSearchable={true}
            options={yearOptions}
          />
          <div>
            <input
              className="cvc"
              placeholder="CVC"
              id="cvc"
              maxL="999"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <label htmlFor="billing-details">Billing details</label>
        <input placeholder="Enter billing address" id="billing-details" />
      </div>
      <div className="row grid">
        <div>
          <label htmlFor="city">City</label>
          <input placeholder="Enter city" id="city" />
        </div>
        <div>
          <label htmlFor="postal-code">Postal code</label>
          <input placeholder="Enter postal code" id="postal-code" />
        </div>
      </div>

      <div className="row">
        <label className="country-label is-required" htmlFor="country">
          Country
        </label>
        <div className="country-section">
          <Select
            styles={selectStyles}
            placeholder={<span>Country</span>}
            isSearchable={true}
          />
          <Select
            styles={selectStyles}
            placeholder={<span>Province</span>}
            isSearchable={true}
          />
        </div>
      </div>
      <div className="row">
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
      </div>
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
  const [collapsed, setCollapsed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Payment processed:", data);
  };

  return (
    <div onClick={() => setCollapsed(!collapsed)} className="accordian">
      <div className="label-with-radio">
        <label htmlFor="credit-card">Pay with credit card</label>
      </div>
      <div className="row icon-tray">
        <Mastercard />
        <Visa />
        <VisaDebit />
        <MastercardDebit />
      </div>
      {true ? <div className="row">
        <ErrorAlertBanner
          title="Card Type Error"
          description="We cannot find this card type. Please try again with a different card."
        />
      </div> : null}
      <CreditCardForm />
    </div>
  );
};

export default CreditCardPayment;
