'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { submitBooking } from '@/lib/api';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
});

const initialValues = { name: '', email: '' };

const inputBase = 'w-full px-[18px] py-[14px] bg-bg-gray border rounded-xl text-base text-text-main outline-none transition-colors placeholder:text-text-secondary focus:border-primary';

export default function BookingForm({ camperId }: { camperId: string }) {
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { message } = await submitBooking(camperId, values);
      toast.success(message);
      resetForm();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-border rounded-[20px] p-10">
      <h2 className="text-xl font-semibold text-text-main m-0 mb-2">Book your campervan now</h2>
      <p className="text-sm text-text-secondary m-0 mb-6 leading-relaxed">Stay connected! We are always ready to help you.</p>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-[14px]" noValidate>
            <div className="flex flex-col gap-1">
              <Field
                name="name"
                type="text"
                placeholder="Name*"
                className={`${inputBase} ${errors.name && touched.name ? 'border-red-600' : 'border-transparent'}`}
              />
              <ErrorMessage name="name" component="span" className="text-xs text-red-600" />
            </div>

            <div className="flex flex-col gap-1">
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${inputBase} ${errors.email && touched.email ? 'border-red-600' : 'border-transparent'}`}
              />
              <ErrorMessage name="email" component="span" className="text-xs text-red-600" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-primary text-white border-none rounded-full text-base font-medium cursor-pointer transition-colors [&:hover:not(:disabled)]:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
