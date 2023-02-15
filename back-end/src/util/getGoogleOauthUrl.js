import { oauthClient } from './oauthClient';

export const getGoogleOauthUrl = () => {
    // we're telling google what we want to access
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];

    // provide user with the access to scopes we specified
    return oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
}