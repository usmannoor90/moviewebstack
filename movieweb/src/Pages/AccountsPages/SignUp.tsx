import { useState } from "react";
import "../../Styling/account.css";
import { FormMethod, Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormData {
  firstname: string;
  lastname: string;
  date: string;
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onsubmit = async (data: FieldValues) => {
    setUser(data.firstname);

    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Access-Control-Allow-Origin",
        "DELETE, POST, GET, OPTIONS"
      );
      myHeaders.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With"
      );

      await axios
        .post("http://localhost:9000/signup", {
          data,
          header: myHeaders,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.user);
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          }
        });
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);

    // reset();
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
          right: submitted ? "10px" : "120%",
        }}
      >
        <h1>User {user} successfully registered!! Navigating to login page</h1>
      </div>
    );
  };

  return (
    <>
      <div className="backDesign" style={{ height: "unset" }}>
        {/* Calling to the methods */}
        <div className="messages">{successMessage()}</div>
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ padding: "4rem 0" }}
        >
          <div className="box">
            <h2 className="signHead">SignUp</h2>
            <form
              action="POST"
              className="d-flex flex-column"
              onSubmit={handleSubmit(onsubmit)}
            >
              <input
                {...register("firstname", {
                  required: "enter firstname",
                  minLength: {
                    value: 3,
                    message: "please enter more than 3 words",
                  },
                })}
                type="text"
                placeholder="Firstname"
                className="my-2"
              />
              <p className="text-danger">{errors.firstname?.message}</p>
              <input
                {...register("lastname", {
                  required: "enter Lastname",
                  minLength: {
                    value: 3,
                    message: "please enter more than 3 words",
                  },
                })}
                type="text"
                placeholder="Lastname"
                className="my-2"
              />
              <p className="text-danger">{errors.lastname?.message}</p>

              <input
                {...register("date", {
                  required: "select date",
                  // pattern: {
                  //   value:
                  //     /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/,
                  //   message: "please select correct format for date",
                  // },
                })}
                type="date"
                placeholder="Date of Birth"
                className="my-2"
              />
              <p className="text-danger">{errors.date?.message}</p>

              <input
                {...register("email", {
                  required: "Please enter the email...",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "please follow correct format for email...",
                  },
                })}
                type="email"
                placeholder="Email"
                className="my-2"
              />
              <p className="text-danger">{errors.email?.message}</p>

              <input
                {...register("password", {
                  required: "please enter correct password...",
                  minLength: {
                    value: 6,
                    message: "Must be greater than 6 characters...",
                  },
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                    message:
                      "please password must contain 6 charachter in which one uppercase, one lowercase, one number and one spacial character...",
                  },
                })}
                type="password"
                placeholder="Passowrd"
                className="my-2"
              />
              <p className="text-danger">{errors.password?.message}</p>

              <button className="signBtn w-100" type="submit">
                Sign Up
              </button>
            </form>

            <p style={{ color: "white" }} className="mt-3">
              if you already have an account then{" "}
              <Link to="/login" className="w-100 text-danger">
                login page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
