import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        // query parameter
        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });
        const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
        const { _id: id, isVerified, email, info } = updatedUser;

        jwt.sign(
            { id, isVerified, email, info },
            process.env.JWT_SECRET,
            (err, token) => { // callback, back to the client 
                if (err) return res.sendStatus(500);
                // back to login page with token
                res.redirect(`http://localhost:3000/login?token=${token}`)
            }
        );
    }
}