import { Router } from "express";

export const errorRoutes = Router()

errorRoutes.get('/*', (req,res)=>{
    res.status(404).json({
        error: 'Dato no encontrado'
    })
})