import { useGoogleLogin } from 'react-google-login';

const clientId = 'Y551863709566-0ipt36927brc8nl0fc3q1d80er7k1jrt.apps.googleusercontent.com';

export const useGoogleAuth = () => {
const onSuccess = (res) => {
console.log('Login Success: currentUser:', res.profileObj);
};
const onFailure = (res) => {
console.log('Login failed: res:', res);
};
const { signIn } = useGoogleLogin({
onSuccess,
onFailure,
clientId,
isSignedIn: true,
accessType: 'offline'
});

return { signIn };
};