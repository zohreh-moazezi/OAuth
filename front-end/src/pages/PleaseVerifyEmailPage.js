import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const PleaseVerifyEmailPage = () => {
    const history = useHistory();

    // automatically navigate away from this page after a few second...
    useEffect(() => {
        setTimeout(() => {
            // user info page
            history.push('/');
        }, 3000);
    }, [history]);

    return (
        <div className="content-container">
            <h1>Thanks for Signing Up!</h1>
            <p>
                A verification email has been sent to the email address you provided.
                Please verify your email to unlock full site features.
            </p>
        </div>
    );
}