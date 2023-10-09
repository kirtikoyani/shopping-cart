export function rules() {
  const nameRules = [
    (v) => !!v || "Name is required",
    (v) => (v && v.length >= 3) || "First name must be at least 3 characters",
  ];
  const emailRules = [
    (v) => !!v || "E-mail is required",
    (v) =>
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || "E-mail must be valid",
  ];
  const passwordRules = [
    (v) => !!v || "Password is required",
    (v) =>
    /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/.test(v) ||
      "Password must be valid",
  ];
  const mobileNumberRules = [
    (v) => !!v || "Phone Number is required",
    (v) => (v && v.length == 10) || "Number must be 10 digits",
  ];
  const addressRules = [(v) => !!v || "Address is required"];
  const countryRules = [(v) => !!v || "Country is required"];

  return {
    nameRules,
    emailRules,
    mobileNumberRules,
    passwordRules,
    addressRules,
    countryRules,
  };
}
