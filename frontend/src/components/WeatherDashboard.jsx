import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

import { useTheme } from "next-themes"

import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Search,
  Moon,
  SunIcon,
  RefreshCw,
  LogOut,
  Wind,
  Droplets
} from "lucide-react"

export function WeatherDashboard({ onLogout }){

  const {theme,setTheme} = useTheme()

  const [loading,setLoading] = useState(true)
  const [cities,setCities] = useState([])
  const [search,setSearch] = useState("")

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = ()=>{

    setLoading(true)

    setTimeout(()=>{

      setCities([
        {city:"London",temp:15,humidity:72,wind:3.5,comfort:78,weather:"clouds"},
        {city:"New York",temp:22,humidity:55,wind:2.1,comfort:85,weather:"clear"},
        {city:"Tokyo",temp:18,humidity:85,wind:5.2,comfort:62,weather:"rain"},
        {city:"Sydney",temp:24,humidity:60,wind:3.0,comfort:88,weather:"clear"},
      ])

      setLoading(false)

    },1000)
  }

  const getIcon=(weather)=>{

    switch(weather){

      case "clear":
        return <Sun className="text-yellow-500"/>

      case "clouds":
        return <Cloud/>

      case "rain":
        return <CloudRain/>

      case "snow":
        return <CloudSnow/>

      default:
        return <Cloud/>
    }
  }

  const filtered = cities.filter(c =>
    c.city.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}

      <header className="border-b bg-white dark:bg-gray-800">

        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Cloud className="text-blue-500"/>

            <h1 className="text-xl font-bold">
              Weather Dashboard
            </h1>

          </div>

          <div className="flex gap-2">

            <Button
              size="icon"
              variant="outline"
              onClick={()=>setTheme(theme==="dark"?"light":"dark")}
            >
              {theme==="dark"?<SunIcon/>:<Moon/>}
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={fetchData}
            >
              <RefreshCw/>
            </Button>

            <Button
              variant="destructive"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2"/>
              Logout
            </Button>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <main className="container mx-auto px-4 py-8">

        <div className="mb-6 relative">

          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>

          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="pl-8"
          />

        </div>

        {loading ?

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[...Array(6)].map((_,i)=>(
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2"/>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20"/>
                </CardContent>
              </Card>
            ))}

          </div>

        :

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((city,i)=>(

            <Card key={i} className="hover:shadow-lg transition">

              <CardHeader className="flex flex-row justify-between items-center">

                <CardTitle>
                  {city.city}
                </CardTitle>

                {getIcon(city.weather)}

              </CardHeader>

              <CardContent className="space-y-4">

                <div className="text-center">

                  <p className="text-4xl font-bold">
                    {city.temp}°C
                  </p>

                </div>

                <div>

                  <p className="text-sm mb-1">
                    Comfort Index
                  </p>

                  <Progress value={city.comfort}/>

                  <Badge className="mt-2">
                    {city.comfort}/100
                  </Badge>

                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">

                  <div className="flex gap-2 items-center">
                    <Droplets size={16}/>
                    {city.humidity}%
                  </div>

                  <div className="flex gap-2 items-center">
                    <Wind size={16}/>
                    {city.wind} m/s
                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

        }

      </main>

    </div>
  )
}