import { Router } from "express";

export const mainRoutes = Router()

mainRoutes.get('/',(req,res)=>{
    res.json(
        {
            "characters": "/peoples", 
            "planets": "/planets", 
            "films": "/films", 
            "species": "/species", 
            "vehicles": "/vehicles", 
            "starships": "/starships"
        }
    )
})