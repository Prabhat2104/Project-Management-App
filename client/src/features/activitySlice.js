import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../api/axios";
import socket from "../socket/socket";


export const setupActivitySocketListeners = (store) => {
    socket.on("activity:projectCreated", (activity) => {
        store.dispatch(
            {
                type: "activity/socketCreate",
                payload: activity,
            }
        );
    });

    socket.on("activity:projectUpdated", (activity) => {
        store.dispatch(
            {
                type: "activity/socketUpdate",
                payload: activity,
            }
        );
    });

    socket.on("activity:projectDeleted", (activity) => {
        store.dispatch(
            {
                type: "activity/socketDelete",
                payload: activity,
            }
        );
    });

    socket.on("activity:projectMemberAdded", (activity) => {
        store.dispatch(
            {
                type: "activity/socketMemberAdded",
                payload: activity,
            }
        );
    });

    socket.on("activity:projectMemberRemoved", (activity) => {
        store.dispatch(
            {
                type: "activity/socketMemberRemoved",
                payload: activity,
            }
        );
    });

    socket.on("activity:taskCreated", (activity) => {
        store.dispatch(
            {
                type: "activity/socketTaskCreated",
                payload: activity,
            }
        );
    });

    socket.on("activity:taskUpdated", (activity) => {
        store.dispatch(
            {
                type: "activity/socketTaskUpdated",
                payload: activity,
            }
        );
    });

    socket.on("activity:taskDeleted", (activity) => {
        store.dispatch(
            {
                type: "activity/socketTaskDeleted",
                payload: activity,
            }
        );
    });
}




export const fetchActivityLogsOfProject = createAsyncThunk("activity/fetch", async (projectId, {rejectWithValue}) => {
    try {
        const {data} = await api.get(`/api/activity/getactivities/${projectId}`);
        if(!data.success) throw new Error(data.message);
        return data.activityLogs;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

const activitySlice = createSlice({
    name:"activity",
    initialState: {
        activities: [],
        loading: false,
        error: null
    },
    reducers: {
        socketCreate: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketUpdate: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketDelete: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketMemberAdded: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketMemberRemoved: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketTaskCreated: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketTaskUpdated: (state, action) => {
            state.activities.unshift(action.payload);
        },
        socketTaskDeleted: (state, action) => {
            state.activities.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchActivityLogsOfProject.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchActivityLogsOfProject.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.activities = action.payload
        })
    }
});

export default activitySlice.reducer;
