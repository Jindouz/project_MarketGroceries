import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login, passReset, passResetConfirm, register } from './loginAPI';
import { refreshToken as refresh } from './loginAPI';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { RootState } from '../../app/store';

interface LoginState {
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
    regError: string | null;
    isRegistered: boolean;
    username: string;
    userId: string;
    admin: boolean;
    // firstLoginAttempt: boolean;
    // passwordIsCorrect: boolean;
}

interface DecodedToken {
    username: string;
    user_id: string;
    admin: boolean;
}
const token = localStorage.getItem('token');

const initialState: LoginState = {
    isLoggedIn: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
    regError: null,
    isRegistered: false,
    username: !!token ? (jwtDecode(token) as DecodedToken).username : '',
    userId: !!token ? (jwtDecode(token) as DecodedToken).user_id : '',
    admin: !!token ? (jwtDecode(token) as DecodedToken).admin : false,
    // firstLoginAttempt: true,
    // passwordIsCorrect: false,
};

export const loginAsync = createAsyncThunk<
  { access: string; refresh: string },
  { credentials: { username: string; password: string }; includeRefreshToken: boolean },
  { rejectValue: string }
>('login', async ({ credentials, includeRefreshToken }, thunkAPI) => {
  try {
    const response = await login(credentials);
    localStorage.setItem('token', response.access);
    if (includeRefreshToken) {
      localStorage.setItem('refreshToken', response.refresh);
    }
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const registerAsync = createAsyncThunk<
  unknown,
  { username: string; password: string, email: string },
  { rejectValue: string }
>('login/registerAsync', async (credentials, thunkAPI) => {
  try {
    const response = await register(credentials);
    return response;
  } catch (regError: any) {
    return thunkAPI.rejectWithValue(regError.message as string);
  }
});

export const refreshAccessToken = createAsyncThunk<
  { access: string },
  void,
  { rejectValue: string }
>('login/refreshAccessToken', async (_, thunkAPI) => {
  try {
    const response = await refresh();
    localStorage.setItem('token', response.access);
    toast.success('Token refreshed successfully!');
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const passResetAsync = createAsyncThunk<
  unknown,
  string, // Specify string as the payload type
  { rejectValue: string }
>('login/passResetAsync', async (email: string, thunkAPI) => {
  try {
    const response = await passReset(email);
    toast.success('Password reset email sent!');
    return response;
  } catch (error: any) {
    toast.error('An error occurred. Please try again later.');
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const passResetConfirmAsync = createAsyncThunk<
  unknown,
  { uid: string; token: string; new_password: string },
  { rejectValue: string }
>('login/passResetConfirmAsync', async ({ uid, token, new_password }, thunkAPI) => {
  try {
    const response = await passResetConfirm(uid, token, new_password);
    toast.success('Password reset successful!');
    return response;
  } catch (error: any) {
    toast.error('An error occurred. Please try again later.');
    return thunkAPI.rejectWithValue(error.message as string);
  }
});

export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  return { type: 'login/logout' } as const;
};


export const checkTokenExpiration = createAsyncThunk(
    'login/checkTokenExpiration',
    async (_, thunkAPI) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
  
      if (!token) {
        thunkAPI.dispatch(handleLogout());
        return;
      }
  
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
  
        if (decodedToken.exp < currentTime) {
          if (!refreshToken) {
            thunkAPI.dispatch(handleLogout());
            toast.error('Session expired. Please login again.');
          } else {
            const decodedRefreshToken: { exp: number } = jwtDecode(refreshToken);
            if (decodedRefreshToken.exp < currentTime) {
              thunkAPI.dispatch(handleLogout());
              toast.error('Session expired. Please login again.');
            } else {
              await thunkAPI.dispatch(refreshAccessToken());
            }
          }
        }
      } catch (error) {
        thunkAPI.dispatch(handleLogout());
      }
    }
  );


  export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      // logout: (state) => {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('refreshToken');
      //   state.isLoggedIn = false;
      //   state.username = '';
      //   state.userId = '';
      //   state.admin = false;
      //   state.firstLoginAttempt = true;
      //   state.passwordIsCorrect = false; 
      //   toast.success('Logout successful!');
      // },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginAsync.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ access: string }>) => {
          state.isLoggedIn = true;
        //   state.logged = true;
          state.isLoading = false;
          state.error = null;
          const decodedToken = jwtDecode(action.payload.access) as { username: string; admin: boolean };
          state.username = decodedToken.username;
          state.admin = decodedToken.admin;
          toast.success(`Login successful! Welcome ${state.username}!`);
        })
        .addCase(loginAsync.rejected, (state, action) => {
          state.isLoggedIn = false;
          state.isLoading = false;
          state.error = action.payload!;
          toast.error(action.payload);
        })
        .addCase('login/logout', (state) => {
          state.isLoggedIn = !!localStorage.getItem('token');
          state.admin = !!token ? (jwtDecode(token) as DecodedToken).admin : false
        })
        .addCase(registerAsync.pending, (state) => {
          state.isLoading = true;
          state.regError = null;
        })
        .addCase(registerAsync.fulfilled, (state) => {
          state.isRegistered = true;
          state.isLoading = false;
          state.regError = null;
          toast.success('Registration successful!');
        })
        .addCase(registerAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.regError = action.payload!;
          toast.error(action.payload);
        });
    },
  });

  // export const { logout } = loginSlice.actions;
  
  export const selectIsRegistered = (state: RootState) => state.login.isRegistered;
  export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
  export const selectIsLoading = (state: RootState) => state.login.isLoading;
  export const selectError = (state: RootState) => state.login.error;
  export const selectRegError = (state: RootState) => state.login.regError;
  export const selectUsername = (state: RootState) => state.login.username;
  export const selectUserId = (state: RootState) => state.login.userId;
  export const selectAdmin = (state: RootState) => state.login.admin;
  
  export default loginSlice.reducer;