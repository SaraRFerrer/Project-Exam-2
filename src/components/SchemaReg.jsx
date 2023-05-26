import * as yup from "yup";

const email = /^[\w\-.]+@(stud\.)?noroff\.no$/;

export const schemaReg = yup.object().shape({
  name: yup
    .string()
    .required("Please Enter Full Name without space")
    .max(25, "Max length is 25 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .matches(email, "please enter a valid Noroff.no email"),
  avatar: yup.string().url("Avatar must be in url form"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be over 8 characters"),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email address")
    .matches(email, "please enter a valid Noroff email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Please enter correct password"),
});
