import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Transition from "../Ui/Transition.jsx";
import signUpImage from "../../public/signup.png";
import { signup } from "../lib/api.js";

const SignUpPage = () => {
  const introContent = (triggerExit) => (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white text-center">
        huntaTalk
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-black dark:text-white font-light tracking-wide opacity-80 max-w-70 sm:max-w-md text-center wrap-break-word">
        Simple! Secure! & Instant!
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-black dark:text-white font-light tracking-wide opacity-80 max-w-70 sm:max-w-md text-center wrap-break-word">
        Chat and video call your friends anytime, anywhere.
      </div>
      <div className="mt-4 w-16 h-0.5 bg-white/50"></div>
      <button
        onClick={triggerExit}
        className="mt-8 px-6 py-2 border border-white/30 dark:border-white/30 text-black dark:text-white hover:bg-white/10 dark:hover:bg-white/30 rounded-2xl transition-all duration-300 text-sm tracking-wide"
      >
        Click to continue
      </button>
    </div>
  );

  const [transitionEnded, setTransitionEnded] = useState(false);

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <Transition
        intro={introContent}
        introDuration={3}
        transitionDuration={1.2}
        type="slide"
        direction="right"
        className="bg-neutral-900 dark:bg-white rounded-xl"
        autoExit={false}
        onFinished={() => setTransitionEnded(true)}
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* SignUp form - left */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
            {/* Logo */}
            <div className="mb-4 flex items-center justify-start gap-2">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider">
                huntaTalk
              </span>
            </div>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error.response.data.message}</span>
              </div>
            )}

            <div className="w-full">
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Create An Account</h2>
                    <p className="text-sm opacity-70">
                      Join huntaTalk amd start your language learning adventure!
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* FULL NAME */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Anil Yadav"
                        className="input input-bordered w-full"
                        value={signupData.fullName}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Provide your email"
                        className="input input-bordered w-full"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Put your account password!"
                        className="input input-bordered w-full"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs opacity-70 mt-1">
                        Password must be at least 8 character long
                      </p>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          required
                        />
                        <span className="text-xs leading-tight">
                          I agree to the{" "}
                          <span className="text-primary hover:underline">
                            terms of service
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline">
                            privacy policy
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Creating....
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* SignUp form - right */}

          <div className="hidden lg:flex w-full lg:w-1/2 bg-indigo-900 items-center justify-center">
            <div className="max-w-md p-8">
              {/* Illustraion */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <img
                  src={signUpImage}
                  alt="Language connection illustration"
                  className="w-full h-full"
                />
              </div>

              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-semibold">
                  Connect with language partners worldwide
                </h2>
                <p className="opacity-70">
                  Practice conversations, make friends, and improve your
                  language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SignUpPage;
