import React, { useState } from "react";
import { schemaReg } from "../../components/SchemaReg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/register.module.css";
import { useNavigate } from "react-router";

function Register() {
  const [showAlert, setShowAlert] = useState(false);
  console.log(showAlert);
  const [venueManager, setVenueManager] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    avatar: "",
    password: "",
    venueManager: false,
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            venueManager: venueManager,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowAlert(true);
        toast.success("Registration was successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(data);
      } else {
        toast.error("Registration failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body className={styles.body}>
      <Formik
        validationSchema={schemaReg}
        onSubmit={handleSubmit}
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
                      name="name"
                      placeholder="Enter your full name"
                      value={values.name}
                      readOnly={false}
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className={styles.error}
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
                      className={styles.error}
                    />
                  </div>
                  <div>
                    <label>Avatar</label>
                    <Field
                      className={styles.input}
                      type="text"
                      name="avatar"
                      placeholder="Enter a valid Url"
                      value={values.avatar}
                      readOnly={false}
                    />
                    <ErrorMessage
                      name="avatar"
                      component="span"
                      className={styles.error}
                    />
                  </div>
                  <div className={styles.checkContainer}>
                    <label className={styles.checkLabel}>
                      Check if you want to become a Venue Manager
                    </label>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      name="venueManager"
                      checked={venueManager}
                      onChange={() => setVenueManager(!venueManager)}
                      readOnly={false}
                    />
                    <ErrorMessage
                      name="avatar"
                      component="span"
                      className={styles.error}
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <Field
                      className={styles.input}
                      type="password"
                      name="password"
                      placeholder="Enter new Password"
                      value={values.password}
                      readOnly={false}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={styles.error}
                    />
                  </div>

                  <button type="submit" className={styles.formBtn}>
                    Submit
                  </button>
                </Form>
                <ToastContainer position="top-right" autoClose={5000} />
              </div>
            </div>
          );
        }}
      </Formik>
    </body>
  );
}

export default Register;
