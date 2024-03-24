const express = require('express')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()
const PORT = 5000

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', { records: null })
})



app.listen(PORT || process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
})