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
    <div className="bg-[var(--white)] border border-[var(--gray-light)] rounded-[16px] p-11">
      <h2 className="text-2xl font-semibold leading-[1.33333] text-[var(--main)] m-0 mb-2">
        Book your campervan now
      </h2>
      <p className="text-base font-normal leading-normal text-[var(--text)] m-0 mb-6">
        Stay connected! We are always ready to help you.
      </p>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col" noValidate>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex flex-col gap-1">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name*"
                  className={`w-full h-[60px] px-[18px] bg-[var(--inputs)] rounded-[12px] text-base font-normal leading-normal text-[var(--main)] outline-none border-2 transition-colors placeholder:text-[var(--gray)] ${errors.name && touched.name ? 'border-red-500' : 'border-transparent focus:border-[var(--button)]'}`}
                />
                <ErrorMessage name="name" component="span" className="text-xs text-red-500" />
              </div>

              <div className="flex flex-col gap-1">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email*"
                  className={`w-full h-[60px] px-[18px] bg-[var(--inputs)] rounded-[12px] text-base font-normal leading-normal text-[var(--main)] outline-none border-2 transition-colors placeholder:text-[var(--gray)] ${errors.email && touched.email ? 'border-red-500' : 'border-transparent focus:border-[var(--button)]'}`}
                />
                <ErrorMessage name="email" component="span" className="text-xs text-red-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[var(--button)] text-white border-none rounded-[200px] text-base font-medium leading-normal cursor-pointer transition-colors hover:bg-[var(--button-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
