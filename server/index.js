import express from 'express'
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

const getISTTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};


app.post('/update-location', async (req, res) => {
    const { latitude, longitude } = req.body;
    const locationData = `${getISTTime()}: ${latitude}, ${longitude}\n`;
    try {
        await fs.writeFile('locations.txt', locationData);
        res.send('Location updated');
    } catch (err) {
        res.status(500).send('Error saving location');
    }
});

app.get('/get-locations', async (req, res) => {
    try {
        const data = await fs.readFile('locations.txt', 'utf8');
        const locations = data.split('\n').filter(line => line).map(line => {
            const [time, coords] = line.split(': ');
            const [latitude, longitude] = coords.split(', ').map(Number);
            return { time, latitude, longitude };
        });
        res.render('map', { locations });
    } catch (err) {
        res.status(500).send('Error reading locations');
    }
});

app.get('/get-locations-java', async (req, res) => {
    try {
        const data = await fs.readFile('locations.txt', 'utf8');
        const locations = data.split('\n').filter(line => line).map(line => {
            const [time, coords] = line.split(': ');
            return `${time}, ${coords}`; // Format as a string
        });
        
        // Join all location strings with a newline character
        const responseString = locations.join('\n');
        res.send(responseString); // Send as plain text
    } catch (err) {
        res.status(500).send('Error reading locations');
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/',  (req, res) => {
    res.render('index');
});
