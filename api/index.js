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


//-----------------------step run terminal ----------------------------//
//1.  cmd  > node api\index.js