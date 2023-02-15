import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email }, // finding the user with the specified email address
            { $set: { googleId, isVerified } },
            { returnOriginal: false }, // we'll get updated document after db query completes
        );
        return result.value; // return the updated user
    } else { // if there isn't an existing user
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            info: {},
        });
        return result.ops[0];
    }
}