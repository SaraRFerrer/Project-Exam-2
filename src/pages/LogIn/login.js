import React, { useState } from "react";
import { schemaLogin } from "../../components/SchemaReg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/login.module.css";
import { Button, Modal } from "react-bootstrap";

function LogIn() {
  const initialValues = { email: "", password: "" };
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setShowAlert(true);
        toast.success("Log In was successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      validationSchema={schemaLogin}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {(formik) => {
        const { handleSubmit } = formik;
        return (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.wrap}></div>

                <div>
                  <label>Email</label>
                  <Field
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </div>

                <div>
                  <label>Password</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="password"
                    placeholder="Enter your Password"
                    readOnly={false}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={styles.formBtn}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Log In
              </Button>
            </Modal.Footer>
            <ToastContainer position="top-right" autoClose={5000} />
          </Modal.Dialog>
        );
      }}
    </Formik>
  );
}

export default LogIn;
