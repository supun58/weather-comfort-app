import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Cloud, Mail, Lock } from "lucide-react"

export function LoginPage({ onLogin, error }) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    onLogin(email,password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      
      <Card className="w-full max-w-md shadow-2xl">

        <CardHeader className="space-y-3 text-center">
            
          <div className="mx-auto bg-blue-500 dark:bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
            <Cloud className="w-8 h-8 text-white" />
          </div>

          <CardTitle className="text-3xl">
            Weather Analytics
          </CardTitle>

          <CardDescription>
            Sign in to access dashboard
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">

              <Label>Email</Label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>

                <Input
                  type="email"
                  placeholder="careers@fidenz.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="pl-9"
                />

              </div>

            </div>

            <div className="space-y-2">

              <Label>Password</Label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>

                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="pl-9"
                />

              </div>

            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}


            <Button className="w-full text-white border-white bg-white-500 hover:bg-blue-600 border">
              Sign In
            </Button>

            <p className="text-xs text-center text-gray-500">
              E-mail: careers@fidenz.com / Password: Pass#fidenz
            </p>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}