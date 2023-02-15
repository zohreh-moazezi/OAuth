import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();

        // the user with that email, we set password for
        const { result } = await db.collection('users')
            .updateOne({ email }, { $set: { passwordResetCode } });

        // mongodb specifies how many documents actually modified here 
        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'react.class.test@gmail.com',
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `
                });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }

        // we didn't put it inside the try block
        // inform successful status regardless the email exists or not
        res.sendStatus(200);
    }
}