import { forgotPasswordRoute } from './forgotPasswordRoute';
// import it
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
// then import it
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { logInRoute } from './logInRoute';
import  { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

// add it here
// then add that here
export const routes = [
    forgotPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    logInRoute,
    resetPasswordRoute,
    signUpRoute,
    testEmailRoute,
    testRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
];
