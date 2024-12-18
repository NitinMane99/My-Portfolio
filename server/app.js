const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/contact', (req, res) => {
    // Handle form submission logic here
    console.log(req.body);
    res.send('Form submitted successfully!');
});

// Salesforce credentials
const clientId = '3MVG9WVXk15qiz1I3qyg7tDvwSAPakZ1gMPB6jLFy5w0f2NdIumslOdXmfpzLf17KAOtmyMf40XSVOtFoJRvv';
const clientSecret = '7523482FEA3660F31E4B549E5589CDB2DB4FFF5A733351AA379D8C736F96EC3E';
const username = 'nitinmane25@salesforce.com';
const password = 'Lunar@31augrvAE2cBTT8Z8kI9KVRcqSGTAz';
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

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', async (req, res) => {
    try {
        const { name, email, Message, Descryption } = req.body;
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

        // Serve the success HTML page from the 'public' directory
        res.status(200).sendFile(path.join(__dirname, 'public', 'success.html'));
    } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        res.status(500).sendFile(path.join(__dirname, 'public', 'error.html')); // Serve the error page
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
