import express from 'express';
const router = express.Router();

router.post('/weather/:city', async(req,res) =>{
  try {
    
    const city = req.params.city;
    console.log("shvs",city);

    let response = await fetch(`${process.env.URL_API}${city}&appid=${process.env.API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        let result = {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp,
            temp_min: jsonResponse.main.temp_min,
            temp_max: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            weather: jsonResponse.weather[0].description,
        }

        res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({Message: "Internal server error"});
  }
})

export default router;