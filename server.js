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

app.get('/search', async (req, res) => {
    const { lastName, firstName, birthYear, deathYear } = req.query;
  
    let query = supabase
        .from('grave_register')
        .select(`
            name_last,
            name_maiden,
            name_first,
            name_middle,
            title,
            birth_date,
            death_date,
            age,
            is_veteran,
            section,
            lot,
            moved_from,
            moved_to_lot,
            notes
        `)
        .order('name_last', { ascending: true });
  
    if (lastName) {
        query = query.ilike('name_last', `%${lastName}%`);
    }
    if (firstName) {
        query = query.ilike('name_first', `%${firstName}%`);
    }
    if (birthYear) {
        query = query.eq('birth_year', birthYear);
    }
    if (deathYear) {
        query = query.eq('death_year', deathYear);
    }
  
    try {
        let { data, error } = await query;
        if (error) {
            throw error;
        }
        // console.log(data)
        res.render('index', { records: data });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
  })

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
})