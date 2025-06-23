"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

// Dummy users for testing
const DUMMY_USERS = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "Admin",
    profilePicture: "/placeholder.svg?height=40&width=40",
    refCode: "ADM001",
    id: "1",
    isVerified: true,
    isProfileCompleted: true,
    isKYCVerified: true,
  },
  {
    email: "verifier@example.com",
    password: "verifier123",
    role: "Verifier",
    profilePicture: "/placeholder.svg?height=40&width=40",
    refCode: "VER001",
    id: "2",
    isVerified: true,
    isProfileCompleted: true,
    isKYCVerified: true,
  },
  {
    email: "preparer@example.com",
    password: "preparer123",
    role: "Preparer",
    profilePicture: "/placeholder.svg?height=40&width=40",
    refCode: "PRE001",
    id: "3",
    isVerified: true,
    isProfileCompleted: true,
    isKYCVerified: true,
  },
]

function Login({ loginStyles }) {
  const navigate = useNavigate()
  const [hidePassword, setHidePassword] = useState(true)
  const [user, setUser] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const showToast = (message, type = "error") => {
    if (type === "error") {
      setError(message)
      setSuccess("")
    } else {
      setSuccess(message)
      setError("")
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setError("")
      setSuccess("")
    }, 3000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const { email, password } = user

    // Basic validation
    if (!email || !password) {
      showToast("Please fill in all fields")
      setLoading(false)
      return
    }

    // Simulate API delay
    setTimeout(() => {
      // Simulate login with dummy users
      const foundUser = DUMMY_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        showToast("Invalid email or password")
        setLoading(false)
        return
      }

      // Check if user is authorized (not regular User)
      if (!foundUser.role || foundUser.role === "User") {
        showToast("Not Authorised")
        setLoading(false)
        return
      }

      // Simulate setting user context and localStorage
      // setCurrentUser({
      //   email: foundUser.email,
      //   profilePicture: foundUser.profilePicture,
      //   role: foundUser.role,
      //   refCode: foundUser.refCode,
      //   id: foundUser.id,
      //   isVerified: foundUser.isVerified,
      //   isProfileCompleted: foundUser.isProfileCompleted,
      //   isKYCVerified: foundUser.isKYCVerified
      // });

      setUser({ email: "", password: "" })

      // Simulate storing token
      // localStorage.setItem('token', 'dummy-token-' + foundUser.id);

      // Navigate based on role
      if (foundUser.role === "Admin") {
        showToast("Admin login successful", "success")
        setTimeout(() => navigate("/admin"), 1000)
      } else if (foundUser.role === "Verifier" || foundUser.role === "Preparer") {
        showToast("Login successful", "success")
        setTimeout(() => navigate("/admin/mytasks"), 1000)
      }

      setLoading(false)
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const { data } = await axios.post('/api/auth/signin', {
        email,
        password
      })
      if (!data.success) {
        toast.error(data.message);
      }
      else {
        const { success, ...rest } = data;
        setCurrentUser({ 
          email: rest.email, 
          profilePicture: rest.profilePicture, 
          role: rest.role, 
          refCode: rest.refCode, 
          id: rest._id, 
          isVerified: rest.isVerified, 
          isProfileCompleted: rest.isProfileCompleted, 
          isKYCVerified: rest.isKYCVerified 
        });
        setUser({ email: "", password: "" })
        localStorage.setItem('token', rest.token);
        (!rest.role || rest.role == 'User') && toast.error("Not Authorised");
        (rest.role == 'Admin') && navigate('/admin'); toast.success("Admin login successful");
        (rest.role == 'Verifier' || rest.role == "Preparer") && navigate('/admin/mytasks'); toast.success("login successful");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    */
  }

  /* COMMENTED OUT - GOOGLE AUTH INTEGRATION
  const login = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          accessToken: resultsFromGoogle.user.uid
        }),
      })
      const data = await res.json();

      if (res.ok) {
        toast.success("User is registered");
        setCurrentUser({ 
          email: data.email, 
          profilePicture: data.profilePicture, 
          role: data.role, 
          refCode: data.refCode, 
          id: data._id, 
          isVerified: data.isVerified 
        });
        localStorage.setItem('token', data.token);
        if (data.role == 'Admin') {
          navigate('/admin');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  */

  return (
    <div className={`flex flex-col w-full h-full ${loginStyles || ""}`}>
      <div className="p-2 bg-transparent">
        <h1 className="text-white font-extrabold text-4xl">Welcome</h1>
        <p className="text-white font-normal text-2xl">Admin Login</p>
      </div>

      {/* Demo credentials info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>
            <strong>Admin:</strong> admin@example.com / admin123
          </p>
          <p>
            <strong>Verifier:</strong> verifier@example.com / verifier123
          </p>
          <p>
            <strong>Preparer:</strong> preparer@example.com / preparer123
          </p>
        </div>
      </div>

      {/* Toast Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border-solid border-black shadow-2xl py-12 px-8 flex flex-col rounded-3xl"
      >
        <div className="flex border border-blue-500 rounded-lg focus-within:border-blue-600 px-3 m-2">
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }}
            className="py-4 px-3 w-full placeholder-blue-500 focus:outline-none"
            disabled={loading}
            required
          />
        </div>

        <div className="flex border border-blue-500 rounded-lg focus-within:border-blue-600 px-3 m-2">
          <input
            type={hidePassword ? "password" : "text"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => {
              setUser((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }}
            className="w-[90%] py-4 px-3 placeholder-blue-500 focus:outline-none"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setHidePassword(!hidePassword)}
            className="p-1 w-[10%] flex items-center justify-center hover:bg-gray-100 rounded"
            disabled={loading}
          >
            {hidePassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
          </button>
        </div>

        {/* COMMENTED OUT - ADDITIONAL FORM ELEMENTS
        <div className="flex justify-between m-2">
          <div className="w-[40%]">
            <input type="checkbox" id="rememberMe" className="m-1" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="../user/forget" className="text-blue-500">
            Forget Password?
          </Link>
        </div>
        */}

        {/* COMMENTED OUT - REGISTRATION LINK
        <div className="flex text-lg m-2">
          <p className="mr-2">New Here?</p>
          <Link to="../user/register" className="text-blue-500">
            Register now
          </Link>
        </div>
        */}

        <button
          type="submit"
          disabled={loading}
          className={`m-2 border border-blue-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ${
            loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-blue-50 active:bg-blue-100 text-black"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
              Logging in...
            </div>
          ) : (
            "LOGIN"
          )}
        </button>

        {/* COMMENTED OUT - GOOGLE SIGN IN
        <span className="m-2">Or</span>
        <div 
          className="border m-2 border-blue-500 h-14 rounded-xl p-2 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-100 text-center flex items-center justify-center cursor-pointer" 
          onClick={login}
        >
          <img src={google || "/placeholder.svg"} alt="google-sign-in" width={"8%"} />
          Sign in with Google
        </div>
        */}
      </form>
    </div>
  )
}

export default Login
