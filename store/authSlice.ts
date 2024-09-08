import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('jwtToken');
const userId = Cookies.get('userId');
const userName = Cookies.get('userName');

const initialState = {
token: token || null,
userId: userId || null,
userName: userName || null,
isLoading: false,
error: null,
};

export const loginUser = createAsyncThunk(
'auth/loginUser',
async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
    const loginResponse = await axios.post(
        'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
        { email, password, isEmployee: true },
        { headers: { 'Content-Type': 'application/json' } }
    );

    const { token, expiresIn } = loginResponse.data; 
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); 

    Cookies.set('jwtToken', token, { secure: true, sameSite: 'Strict' });
    Cookies.set('tokenExpiry', expirationDate.getTime().toString());

    const userInfoResponse = await axios.get(
        'https://api-yeshtery.dev.meetusvr.com/v1/user/info',
        {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        }
    );

    const { id, name } = userInfoResponse.data;
    Cookies.set('userId', id);
    Cookies.set('userName', name);

    return { token, id, name };
    } catch (error) {
    return rejectWithValue('Invalid credentials or error retrieving user info');
    }
}
);

const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
    logout: (state) => {
    Cookies.remove('jwtToken');
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('tokenExpiry');
    state.token = null;
    state.userId = null;
    state.userName = null;
    },
},
extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userId = action.payload.id;
        state.userName = action.payload.name;
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    });
},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
