import {pool} from '../config/db.js'

export const getDate = async (req,res)=>{
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
}

export const getIndex = (req,res)=>{
    res.render('index')
}