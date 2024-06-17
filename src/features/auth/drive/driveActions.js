import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {api, authApi} from '../../api/api';

export const fetchDriveInfo = createAsyncThunk('drive/fetchDriveInfo', async());
