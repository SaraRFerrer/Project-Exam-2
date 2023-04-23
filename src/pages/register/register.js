import React from "react";
import { schemaReg } from "../../components/SchemaReg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/register.module.css";

function Register() {
  const alert = () => {
    toast.success("Registration was successful !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const initialValues = { name: "", email: "", avatar: "", password: "" };

  return (
    <Formik
      validationSchema={schemaReg}
      onSubmit={console.log}
      initialValues={initialValues}
    >
      {(formik) => {
        const { handleSubmit, values } = formik;
        return (
          <div className={styles.registerContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.regHeader}>Register</h1>
            </div>
            <div className={styles.registerForm}>
              <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.wrap}>
                  <label>Full Name</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={values.fullName}
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="span"
                    className="error"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <Field
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={values.email}
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </div>
                <div>
                  <label>Avatar</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="subject"
                    placeholder="Enter a valid Url"
                    value={values.subject}
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="subject"
                    component="span"
                    className="error"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="message"
                    placeholder="Enter new Password"
                    value={values.message}
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="message"
                    component="span"
                    className="error"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.formBtn}
                  onClick={() => {
                    alert();
                  }}
                >
                  Submit
                </button>
                <ToastContainer position="top-right" autoClose={5000} />
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default Register;
