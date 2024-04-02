import { signOut } from 'firebase/auth';
import { keysLocalStorage } from '../local-storege';
import { auth } from './firebase/config';

const handleLogout = async () => {
    localStorage.removeItem(keysLocalStorage.token);
    localStorage.removeItem(keysLocalStorage.refresh);

    try {
        await signOut(auth);
    } catch (error) {
        console.log('ERROR LOGGING OUT', error);
    }
};

const appService = { handleLogout };

export default appService;
