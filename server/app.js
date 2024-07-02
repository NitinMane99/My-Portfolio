const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/contact', (req, res) => {
    // Handle form submission logic here
    console.log(req.body);
    res.send('Form submitted successfully!');
});

// Salesforce credentials
const clientId = '3MVG9WVXk15qiz1I3qyg7tDvwSHOTWTpD734y58E62s9iaZOYmdD1RdSzvNX0XlJJJmuo3LhI7dpsqfgQxBd4';
const clientSecret = 'CB840FEB222B8A0E77643298E5668EC36491F065E942DFCB91C1955E1794D879';
const username = 'nitinmane25@salesforce.com';
const password = 'Trailhead@123zjtTIlK44E09V57qvH9DkpSv';
const tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

async function getAuthToken() {
    try {
        const response = await axios.post(tokenUrl, null, {
            params: {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username: username,
                password: password
            }
        });
        console.log('OAuth Token:', response.data);
        return {
            accessToken: response.data.access_token,
            instanceUrl: response.data.instance_url
        };
    } catch (error) {
        console.error('Error fetching OAuth token:', error.response.data);
        throw error;
    }
}

app.post('/submit', async (req, res) => {
    try {
        const { name, email, Message,Descryption} = req.body;
        const { accessToken, instanceUrl } = await getAuthToken();

        const salesforceUrl = `${instanceUrl}/services/data/v51.0/sobjects/mydataid__DataBase__c`;
        console.log('Salesforce URL:', salesforceUrl);
        await axios.post(salesforceUrl, {
            Name: name,
            mydataid__Email__c: email,
            mydataid__Message__c: Message,
            mydataid__Descryption__c: Descryption
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).send('Form submitted successfully');
    } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        res.status(500).send('Error submitting form');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
