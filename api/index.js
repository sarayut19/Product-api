import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json())    



const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// GET all
app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*')
  if (error) return res.status(500).json(error)
  res.json(data)
})

// POST  
app.post('/products', async (req, res) => {
  const { name, price, description } = req.body
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, description }])
    .select();

  if (error) return res.status(500).json(error)
  res.json(data)
})

// PUT
app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body
  const { data, error } = await supabase
    .from('products')
    .update({ name, price, description })
    .eq('id', id)
    .select()

  if (error) return res.status(500).json(error)
  res.json(data)
})

// DELETE
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()

  if (error) return res.status(500).json(error)
  res.json(data)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app


//1.-----------------------step run terminal (dev เสร็จสั่ง  api index.js)----------------------------//
//  cmd  > node api\index.js

//2.------------------- user and pass for supabase -------------------//
// user: myapi 
//pass: sGIwYGblbuMmWOFt


//3.------------------- link for supabase (DB) -------------------//
// https://supabase.com/dashboard/project/wcawhgokamaurmkcalcw/editor/17546?schema=public

//4.------------------- link for frontend api-------------------//
// https://product-api-1asz.vercel.app/products 


//5.------------------- link for postman (TEST) -------------------//
//5.1 ------------- localhost  (TEST) -------------//
// GET all: http://localhost:3000/products
// POST: http://localhost:3000/products
// PUT: http://localhost:3000/products/:id
// DELETE: http://localhost:3000/products/:id

//5.2 ------------- vercel  (TEST) -------------//
// GET all: https://product-api-1asz.vercel.app/products
// POST: https://product-api-1asz.vercel.app/products
// PUT: https://product-api-1asz.vercel.app/products/:id
// DELETE: https://product-api-1asz.vercel.app/products/:id


//6.------------------- link github -------------------//
//https://github.com/sarayut19/Product-api







