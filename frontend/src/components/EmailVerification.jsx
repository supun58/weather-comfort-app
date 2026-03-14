// import { useState, useEffect } from "react"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Mail, Clock, Shield } from "lucide-react"
// import { useAuth0 } from "@auth0/auth0-react"

// export function VerifyOTP() {
//   const [code, setCode] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [timer, setTimer] = useState(60)
//   const { isAuthenticated, loginWithRedirect } = useAuth0()

//   //Timer countdown
//   useEffect(() => {
//     setTimer(60) 
//     let interval
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1)
//       }, 1000)
//     } 
//     return () => clearInterval(interval)
//   }, [timer])

//   const verifyOTP = async (e) => {
//     e.preventDefault()
    
//     if (!code || code.length < 6) {
//       setError("Please enter a valid 6-digit code")
//       return
//     }

//     setIsLoading(true)
//     setError("")

//     try {
//       const res = await fetch("http://localhost:5000/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ code })
//       })

//       if (res.ok) {
//         window.location.replace("/")
//       } else {
//         const data = await res.json()
//         setError(data.message || "Invalid OTP. Please try again.")
//         // Reset timer on failure? Optional
//         setTimer(60)
//       }
//     } catch (err) {
//       setError("Network error. Please check your connection.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   //Format timer
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
//   }

//   //Demo quick-fill for testing
//   const fillDemoCode = () => {
//     setCode("123456")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
//       <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
//         <CardHeader className="space-y-4 text-center pb-8">
//           <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
//             Verify OTP
//           </CardTitle>

//           <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
//             Enter the 6-digit code sent to your email
//           </CardDescription>

//           <div className="flex items-center justify-center gap-2 text-sm">
//             <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//             <span className="text-gray-600 dark:text-gray-300">careers@fidenz.com</span>
//           </div>

//           {/* Demo hint - remove in production */}
//           <div className="text-xs text-gray-400">
//             Demo code: <button 
//               type="button"
//               onClick={fillDemoCode}
//               className="text-blue-500 hover:text-blue-700 underline"
//             >
//               123456
//             </button>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={verifyOTP} className="space-y-6">
//             {error && (
//               <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center border border-red-200 dark:border-red-800">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div className="relative">
//                 <Input
//                   type="text"
//                   placeholder="Enter 6-digit code"
//                   value={code}
//                   onChange={(e) => {
//                     setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
//                     setError("")
//                   }}
//                   maxLength={6}
//                   className="text-center text-2xl tracking-[0.5em] font-mono h-14 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 bg-white dark:bg-gray-700"
//                   disabled={isLoading}
//                   autoFocus
//                 />
//                 {code.length === 6 && (
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Button
//                 type="submit"
//                 disabled={isLoading || code.length !== 6}
//                 className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
//                     Verifying...
//                   </div>
//                 ) : (
//                   "Verify & Continue"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }