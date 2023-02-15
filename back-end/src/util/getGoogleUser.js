import axios from 'axios';
import { oauthClient } from './oauthClient';

// request in order to load the user's data 
const getAccessAndBearerTokenUrl = ({ accessToken }) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

// actual helper function
export const getGoogleUser = async ({ code }) => {
    // parsing some tokens out of the code that google returns to us
    const { tokens } = await oauthClient.getToken(code);
    const response = await axios.get(
        getAccessAndBearerTokenUrl({ accessToken: tokens.access_token }),
        { headers: { Authorization: `Bearer ${tokens.id_token}`} },
    );
    return response.data;
}