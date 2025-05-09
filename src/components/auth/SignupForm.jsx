import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import MiniLoader from '../preloader/mini-preloader';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

const signupSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Fullname is required')
    .trim(),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .trim(),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/,
      'Password must contain at least one uppercase letter, one symbol, and be at least 8 characters long'
    )
    .required('Password is required'),
});

const SignupForm = ({ onSuccess }) => {
  const { setLoading, setError } = useAuthStore();

  return (
    <Formik
      initialValues={{ fullname: '', email: '', password: '' }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setLoading(true);
          
          // Sanitize and validate form data
          const sanitizedValues = {
            fullname: values.fullname ? values.fullname.trim() : '',
            email: values.email ? values.email.trim().toLowerCase() : '',
            password: values.password || ''
          };
          
          // Additional validation to prevent submission of empty values
          if (!sanitizedValues.fullname || !sanitizedValues.email || !sanitizedValues.password) {
            throw new Error('All fields are required');
          }
          
          // Attempt signup with sanitized values
          const response = await authService.signup(sanitizedValues);
          
          // Verify we got a successful response
          if (response) {
            toast.success('Registration successful!');
            // Only call onSuccess if it's a function and we have a successful response
            if (typeof onSuccess === 'function') {
              onSuccess();
            } else {
              console.warn('onSuccess callback is not a function or not provided');
            }
          } else {
            throw new Error('No response from server');
          }
        } catch (error) {
          // Better error handling with fallbacks at each level
          let errorMessage = 'Registration failed';
          
          if (error && typeof error === 'object') {
            if (error.message) {
              errorMessage = error.message;
            }
            
            if (error.response) {
              if (error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
              } else if (error.response.status === 400) {
                errorMessage = 'Invalid input data';
              } else if (error.response.status === 409) {
                errorMessage = 'Email already exists';
              } else if (error.response.status >= 500) {
                errorMessage = 'Server error, please try again later';
              }
            }
          }
          
          setError(errorMessage);
          toast.error(errorMessage);
          console.error('Signup error:', error);
        } finally {
          setLoading(false);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label className="font-medium">Fullname</label>
            <Field
              type="text"
              name="fullname"
              className="px-2 py-3 text-md border mt-2 focus:outline-none border-gray-400 rounded-lg w-full bg-gray-50 font-normal placeholder:text-gray-300"
              placeholder="Enter your fullname"
            />
            {errors.fullname && touched.fullname && (
              <div className="text-red-500 text-sm mt-1">{errors.fullname}</div>
            )}
          </div>

          <div>
            <label className="font-medium">Email</label>
            <Field
              type="email"
              name="email"
              className="px-2 py-3 text-md border mt-2 focus:outline-none border-gray-400 rounded-lg w-full bg-gray-50 font-normal placeholder:text-gray-300"
              placeholder="Enter your email address"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label className="font-medium">Password</label>
            <Field
              type="password"
              name="password"
              className="px-2 py-3 text-md border mt-2 focus:outline-none border-gray-400 rounded-lg w-full bg-gray-50 font-normal placeholder:text-gray-300"
              placeholder="Password must contain 8 characters"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 font-medium text-white justify-center rounded-md bg-blue-400 hover:bg-blue-600 duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? <MiniLoader /> : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;