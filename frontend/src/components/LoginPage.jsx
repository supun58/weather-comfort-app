import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Mail, Lock } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"

export function LoginPage(  { error }) {

const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    loginWithRedirect()}

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
            Click Enter to Sign in
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

<div className="items-center text-center">
            <Button onClick={() => loginWithRedirect()} className="w-25 bg-white! text-black color-white border-white">
              Enter
            </Button>
</div>
            <p className="text-xs text-center text-gray-500">
              E-mail: careers@fidenz.com / Password: Pass#fidenz
            </p>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}