import { ObjectID } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        // get verification string from the request body
        const { verificationString } = req.body;
        // get connection to our db
        const db = getDbConnection('react-auth-db');
        // find the user with this verification string from the database
        const result = await db.collection('users').findOne({
            verificationString,
        });

        // if there is no result (verification string is incorrect)
        if (!result) return res.status(401).json({ message: 'The email verification code is incorrect' });

        // if there is, get the data
        const { _id: id, email, info } = result;

        // verify user
        await db.collection('users').updateOne({ _id: ObjectID(id) }, {
            $set: { isVerified: true }
        });

        // send the information back to the user
        jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
        });
    }
}