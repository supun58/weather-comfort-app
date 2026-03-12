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

//get weather data from backend and set to cities state
    const fetchData = async ()=>{
        setLoading(true)
        try {
            const response = await fetch("http://localhost:5000/weather")
            const data = await response.json()
            setCities(data)
            console.log("Fetched weather data:", data)
        } catch (error) {
            console.error("Error fetching weather data:", error)
        }
        setLoading(false)
    }


const WeatherIcon = ({ response, size = "2x" }) => {
  const iconCode = response.icon;
  const description = response.description; 
  
  return (
    <img 
      src={`https://openweathermap.org/img/wn/${iconCode}@${size}.png`}
      alt={response.description}
      className="w-10 h-10"
        title={description} // Show description on hover
    />
  );
};

  const filtered = cities.filter(c =>
    c.cityName.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}

      <header className="border-b bg-white dark:bg-gray-800">

        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Cloud className="text-blue-500"/>

            <h1 className="text-lg font-bold">
              Weather Dashboard
            </h1>

          </div>

          <div className="flex gap-2">

            <Button
              size="icon"
              variant="outline"
              onClick={()=>setTheme(theme==="dark"?"light":"dark")}
            >
            {theme === "dark" ? (<SunIcon />) : (<Moon style={{ color: 'white', fill: 'white' }} />)}           
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={fetchData}
            >
              <RefreshCw style={{ color: 'white' }}/>
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

          {filtered.map((cityName,i)=>(

            <Card key={i} className="hover:shadow-lg transition">

              <CardHeader className="flex flex-row justify-between items-center">

                <CardTitle>
                  {cityName.cityName}
                </CardTitle>

                <WeatherIcon response={cityName}/>
                <p>{cityName.description}   </p>
   
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="text-center">

                  <p className="text-4xl font-bold">
                    {(cityName.temperature - 273.15).toFixed(1)}°C                  
                </p>

                </div>

                <div>

                  <p className="text-sm mb-1">
                    Comfort Index
                  </p>

                  <Progress value={cityName.comfort}/>

                  <Badge className="mt-2">
                    {cityName.comfort}/100
                  </Badge>

                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">

                  <div className="flex gap-2 items-center" title="Humidity">
                    <Droplets size={16} title="Humidity"/>
                    {cityName.humidity}% <p className="ml-1 text-gray-400">- Humidity</p>
                  </div>


                  <div className="flex gap-2 items-right " title="Wind Speed">
                    <Wind size={16} title="Wind Speed"/>
                    {cityName.windSpeed} m/s <p className="ml-1 text-gray-400">- Wind Speed</p>
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