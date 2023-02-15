import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';

export const EmailVerificationLandingPage = () => {
    // it it's loading or not
    const [isLoading, setIsLoading] = useState(true);
    // whether or not the verification is successful
    const [isSuccess, setIsSuccess] = useState(false);
    // get the verification string from our url parameters
    const { verificationString } = useParams();
    // once we get token back from the server, we can set it locally
    const [,setToken] = useToken();

    // make the request to the server endpoint that we just created
    useEffect(() => {
        const loadVerification = async () => {
            try {
                // contain the verificationString as the request body
                const response = await axios.put('/api/verify-email', { verificationString });
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (e) { // axios automatically throw an error (4xx or 5xx)
                setIsSuccess(false);
                setIsLoading(false);
            }
        }

        // call the funciton inside useEffect hook
        loadVerification();
    }, [setToken, verificationString]); // two dependencies

    if (isLoading) return <p>Loading...</p>;
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
}