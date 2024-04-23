import * as yup from 'yup';

export const signUpValidation = yup.object({
    name: yup.string().min(2).max(25).required("Please enter Name!"),
    username: yup.string().min(2).max(25).required("Please enter Username!"),
    email: yup.string().email().required("Please enter Email!"),
    password: yup.string().min(6).max(25).required("Please enter Password!")
});

export const loginValidation = yup.object({
    username: yup.string().min(2).max(25).required("Please enter Username!"),
    password: yup.string().min(6).max(25).required("Please enter Password!")
});

