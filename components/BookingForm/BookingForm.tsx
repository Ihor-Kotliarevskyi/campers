'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { submitBooking } from '@/lib/api';
import styles from './BookingForm.module.css';

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
      await submitBooking(camperId, values);
      toast.success('Booking successful! We will contact you soon.');
      resetForm();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.field}>
              <Field
                name="name"
                type="text"
                placeholder="Name*"
                className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
              />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>

            <div className={styles.field}>
              <Field
                name="email"
                type="email"
                placeholder="Email*"
                className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
              />
              <ErrorMessage name="email" component="span" className={styles.error} />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
