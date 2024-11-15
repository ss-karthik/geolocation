import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

let locationsData = [];

const getISTTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

app.post('/update-location', (req, res) => {
    const { latitude, longitude } = req.body;
    const locationEntry = {
        time: getISTTime(),
        latitude,
        longitude
    };
    
    locationsData[0] = locationEntry;
    
    res.send('Location updated');
});

app.get('/get-locations', (req, res) => {
    try {
        res.render('map', { locations: locationsData });
    } catch (err) {
        res.status(500).send('Error reading locations');
    }
});

app.get('/get-locations-java', (req, res) => {
    try {
        const responseString = locationsData.map(entry => `${entry.time}, ${entry.latitude}, ${entry.longitude}`).join('\n');
        res.send(responseString); // Send as plain text
    } catch (err) {
        res.status(500).send('Error reading locations');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index');
});
