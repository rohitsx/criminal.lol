import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import bgVideo from "../../assets/img/bg.mp4";
import logo from "../../assets/img/btc.png";
import PopUp from "../../utils/popUp";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
  });
  const [popMessage, setPopMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("send");

    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + "/signup", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        dob: formData.dob,
      })
      .then((res) => {
        console.log(res.data);

        setPopMessage(res.data);
        ``;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="video-background absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          id="bg-video"
          className="object-cover w-full h-full"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      {popMessage && (
        <PopUp
          message={popMessage}
          setMessage={setPopMessage}
          navigation="/login"
        />
      )}
      <div className="z-10 w-full max-w-md p-8 space-y-6 bg-black bg-opacity-50 rounded-xl backdrop-blur-md">
        <div className="text-center">
          <a
            href="https://criminal.lol/"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            <img src={logo} alt="Criminal Logo" className="h-8 w-8" />
            <div className="text-white">criminal.lol</div>
          </a>
        </div>
        <h1 className="text-2xl font-bold uppercase text-white text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "email", "dob", "password"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="text-sm font-medium block mb-1 text-neutral-300"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative">
                <input
                  id={field}
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field === "dob"
                      ? "date"
                      : "text"
                  }
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm bg-white bg-opacity-10 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                />
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition duration-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Register
          </button>

          <div className="text-sm text-center">
            <span className="text-neutral-400">Already have an account? </span>
            <a
              href="/login"
              className="text-white hover:text-neutral-300 hover:underline transition duration-300"
            >
              Login
            </a>
          </div>
        </form>

        <div className="text-xs text-center text-neutral-500">
          © 2024 criminal.lol
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
