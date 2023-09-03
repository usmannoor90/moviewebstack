import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface formData {
  email: string;
  password: string;
}

function Login() {
  const [emailerror, setEmailError] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<formData>();

  const onSubmit = async (userData: FieldValues) => {
    try {
      await axios
        .post("http://localhost:9000/login", {
          data: userData,
        })
        .then((res) => {
          if (res.status === 200) {
            setEmailError(false);
            setTimeout(() => {
              navigate("/home");
            }, 1000);
            console.log(res.data.token);
          }
          if (res.status === 400) {
            setEmailError(true);
            console.log(res.data.msg);
          }
        });
    } catch (error) {
      setEmailError(true);
    }

    // console.log(data);
    // reset();
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: emailerror ? "" : "none",
          right: emailerror ? "10px" : "120%",
        }}
      >
        <h1>email is not found</h1>
      </div>
    );
  };

  return (
    <>
      <div className="backDesign">
        <div>{successMessage()}</div>
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="box">
            <h2 className="signHead">Login</h2>
            <form
              action="/home/"
              className="d-flex flex-column"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("email", {
                  required: "Please enter the email...",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "please follow correct format for email...",
                  },
                })}
                id="email"
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
                id="password"
                placeholder="Password"
                className="my-2"
              />

              <p className="text-danger">{errors.password?.message}</p>
              {/* <Link to="/home" className="w-100"> */}
              <button className="signBtn w-100 my-2">Login</button>
              {/* </Link> */}
            </form>
            <p style={{ color: "white" }}>
              To The Dashboard of Movies World{" "}
              <Link to="/home" style={{ color: "red" }}>
                Dashbord Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
