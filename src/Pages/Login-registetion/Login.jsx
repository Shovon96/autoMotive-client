import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebaseConfig/firebase.config";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

    const { signInWithGoogle } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState('')
    const [loginSuccess, setLoginSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignIn = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        // reset error
        setLoginError('')
        setLoginSuccess('')

        // Login user
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoginSuccess('User Login Successfully')
                toast.success("Login Success !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
                navigate(location?.state ? location.state : '/')
                e.target.reset()
            })
            .catch(error => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
                setLoginError(error.message)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location?.state ? location.state : '/')
                toast.success("Login Success !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            })
            .catch(error => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

            })
    }

    return (
        <div  className="hero h-auto" style={{backgroundImage: 'url(https://i.ibb.co/J7cJxxx/download-1.jpg)'}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="h-auto my-16 flex items-center justify-center" style={{backdropFilter: 'blur(5px)'}}>
                <div className="border bg-opacity-10 p-8 rounded-lg shadow-2xl w-96">
                    <h2 className="text-5xl text-center text-gray-400 font-extrabold mb-6">Sign In</h2>

                    {/* Form */}
                    <form onSubmit={handleSignIn}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-rose-600 text-base font-bold mb-2">Email:</label>
                            <input
                                type="email" id="email"
                                name="email"
                                placeholder="Type Your Email" required
                                className="w-full px-3 py-2 border rounded-md bg-transparent border-b border-gray-500 focus:outline-none focus:border-rose-700" />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-red-600 text-base font-bold mb-2">Password</label>
                            <div className="flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password" placeholder="Type Your Password" required
                                    name="password" 
                                    className="relative w-full px-3 py-2 border text-white rounded-md bg-transparent border-b border-gray-500 focus:outline-none focus:border-rose-700" />
                                <span className=" absolute ml-72" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye className="text-white"  title="Hide"></FaEye> : <FaEyeSlash className="text-white" title="Show"></FaEyeSlash>
                                    }
                                </span>
                            </div>
                        </div>

                        <p className="mb-4 text-blue-600 hover:text-blue-500 hover:underline"><a href="">Forget Your Password?</a></p>

                        {/* Sign In Button */}
                        <button type="submit" className="w-full bg-gray-500 text-white text-lg font-semibold p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue">
                            Sign In
                        </button>
                    </form>

                        <div className="flex justify-between mt-3">
                            <button className="btn px-8 font-bold" onClick={handleGoogleSignIn}><FaGoogle className="text-red-500 text-lg"></FaGoogle>Google</button>
                            <button className="btn px-8 font-bold"><FaGithub className="text-lg"></FaGithub>GitHub</button>
                        </div>


                        {/* success message set in form */}
                        {
                            loginSuccess && <p className="text-sm text-green-600">{loginSuccess}</p>
                        }

                        {/* Error message set in form */}
                        {
                            loginError && <p className=" text-sm text-red-700">{loginError}</p>
                        }
                        <p className="mt-4 text-white">You do not have an account? Go <Link to='/registetion' className="text-red-600 underline text-lg font-bold">SignUp</Link></p>

                </div>
            </div>
        </div>
    );
};

export default Login;
