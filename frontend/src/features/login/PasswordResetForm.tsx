import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { passResetAsync } from './loginSlice';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';

const PasswordResetForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const dispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.login.isLoading);
    // const message = useAppSelector((state: RootState) => state.login.message);


    const handlePassReset = () => {
        dispatch(passResetAsync(email));
      };
      
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="button" onClick={handlePassReset} disabled={loading}>Reset Password</button>
            </form>
            {/* {message && <p>{message}</p>} */}
        </div>
    );
};

export default PasswordResetForm;
