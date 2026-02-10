import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import projectReducer from '../features/projectSlice'
import taskReducer from '../features/taskSlice'
import activityReducer from '../features/activitySlice'
import { setupProjectSocketListeners } from '../features/projectSlice'
import { setupTaskSocketListeners } from '../features/taskSlice'
import { setupActivitySocketListeners } from '../features/activitySlice'


 const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        task: taskReducer,
        activity: activityReducer,
    }
});

setupProjectSocketListeners(store);
setupTaskSocketListeners(store);
setupActivitySocketListeners(store);

export default store;