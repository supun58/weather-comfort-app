import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

import { useTheme } from "next-themes"

import { useAuth0 } from "@auth0/auth0-react"


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

export function WeatherDashboard(){

  const { logout } = useAuth0()

  const {theme,setTheme} = useTheme()

  const [loading,setLoading] = useState(true)
  const [cities,setCities] = useState([])
  const [search,setSearch] = useState("")

  const [sortBy,setSortBy] = useState("comfortScore")

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


const WeatherIcon = ({ response, size = "4x" }) => {
  const iconCode = response.icon;
  const description = response.description; 
  
  return (
    <img 
      src={`https://openweathermap.org/img/wn/${iconCode}@${size}.png`}
      alt={response.description}
      className="w-10 h-10"
        title={description} 
    />
  );
};

useEffect(() => {
  if (!cities || cities.length === 0) return;
  
  const sortedCities = [...cities].sort((a, b) => {
    if (sortBy === "comfortScore") {
      return b.comfortScore - a.comfortScore;
    } else if (sortBy === "cityName") {
      return a.cityName.localeCompare(b.cityName);
    }
    return 0;
  });
  
  setCities(sortedCities);
}, [sortBy, cities]); 

  const filtered = cities.filter(c =>
    c.cityName.toLowerCase().includes(search.toLowerCase())
  )

  //rank cities based on comfortScore
  const ranked = [...cities].sort((a,b)=>b.comfortScore - a.comfortScore)
  console.log("Ranked cities:", ranked)
    

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}

      <header className="border-b bg-white dark:bg-gray-800">

        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Cloud className="text-blue-500 text-4xl"/>

            <p className="text-2xl font-bold">
              Weather Dashboard
            </p>

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
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        })
      }
    >
        <LogOut style={{ color: 'red' }}/>
      Logout
    </Button>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <main className="container mx-auto px-4 py-8">

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
        </div>

         <div className="flex gap-2">
            <Button
                variant={sortBy === "comfortScore" ? "default" : "outline"}
                onClick={()=>setSortBy("comfortScore")}
                className="flex-1 sm:flex-none text-white dark:text-white"
              > 
              By Comfort
            </Button>

            <Button
                variant={sortBy === "cityName" ? "default" : "outline"}
                onClick={()=>setSortBy("cityName")}
                className="flex-1 sm:flex-none text-white dark:text-white"
              > 
                By Name
            </Button>
          </div> 
        </div>

        {loading ? (

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

        ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((cityName,i)=>(

            <Card key={i} className="hover:shadow-lg transition">

              <CardHeader className="flex flex-row justify-between items-center">

                <CardTitle>
                  {cityName.cityName}
                </CardTitle>

                <Badge
                    variant="secondary"
                    className="text-xs"
                >
                Rank #{ranked.findIndex(c=>c.cityName === cityName.cityName) + 1}
                </Badge>

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

                  <Progress value={cityName.comfortScore}/>

                  <Badge className="mt-2">
                    {cityName.comfortScore}/100
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

        )}

      </main>

    </div>
  )
}