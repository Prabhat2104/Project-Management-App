import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import api from '../api/axios';
import socket from "../socket/socket";

export const setupTaskSocketListeners = (store) => {
    const{dispatch, getState} = store;
    
    socket.on("task:created", (task) => {
        const {auth} = getState();
        if(auth.authUser?._id===task.assignedTo||auth.authUser?.isAdmin){
            dispatch({
                type: "task/socketCreate",
                payload: task,
            });
        }
    });

    socket.on("task:updated", (task) => {
        const {auth} = getState();
        if(auth.authUser?._id===task.assignedTo||auth.authUser?.isAdmin){
            dispatch({
                type: "task/socketUpdate",
                payload: task,
            });
        }
    });

    socket.on("task:deleted", (task) => {
        // const {auth} = getState();
        // if(authUser?._id===task.assignedTo||auth.authUser?.isAdmin){
            dispatch({
                type: "task/socketDelete",
                payload: task,
            });
        //}
    });

    socket.on("comment:added", (comment) => {
        dispatch({
            type: "task/socketCommentAdd",
            payload: comment,
        })
    })
};




//Fetch All Tasks

export const fetchAllTasksOfProject = createAsyncThunk("task/fetchAll",
    async (projectId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/api/task/get/${projectId}`);
            if (!data.success) throw new Error(data.message);
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const fetchTaskOfUser = createAsyncThunk("task/fetchTaskOfUser", async ({projectId, userId}, { rejectWithValue }) => {
    try {
        //const { data } = await api.get(`/api/task/get/${projectId}`);
        const { data } = await api.get(`/api/task/getUserTasksOfProject/${projectId}`);
        // if (!data.success) throw new Error(data.message);


        //  const filteredTasks = data.tasks.filter(
        //     (task) => task.assignedTo === userId
        // );

        // return filteredTasks;
        return data.tasks;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }

}
)

export const addNewTask = createAsyncThunk("task/addNew", async (taskDetails, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/api/task/create', taskDetails);
        if (!data.success) throw new Error(data.message);
        return data.task;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
)

export const updateTask = createAsyncThunk("task/update", async (taskDetails, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/api/task/update/${taskDetails._id}`, taskDetails);
        if (!data.success) throw new Error(data.message);
        return data.task;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const removeTask = createAsyncThunk(
    "task/remove", async (taskId, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(`/api/task/delete/${taskId}`);
            if (!data.success) throw new Error(data.message);
            return taskId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllComments = createAsyncThunk("comments/get", async (taskId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/api/comment/getComments/${taskId}`);
        if (!data.success) throw new Error(data.message);
        return data.comments;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

export const createComment = createAsyncThunk("comments/create", async (commentDetails, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/api/comment/create', commentDetails);
        if (!data.success) throw new Error(data.message);
        return data.comment;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
}
);

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {
        socketCreate: (state, action) => {

            state.tasks.push(action.payload);
        },

        socketUpdate: (state, action) => {
            state.tasks = state.tasks.map((t) => t._id === action.payload._id ? action.payload : t);
        },

        socketDelete: (state, action) => {
            state.tasks = state.tasks.filter((t) => t._id !== action.payload._id);
        },

        socketCommentAdd: (state, action) => {
            state.comments.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasksOfProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllTasksOfProject.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks = action.payload;
            })
            .addCase(fetchAllTasksOfProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(fetchTaskOfUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTaskOfUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks = action.payload;
            })
            .addCase(fetchTaskOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.loading = false;
                //state.tasks.push(action.payload);
                state.error = null;
                toast.success("Task Added Successfully");
            })
            .addCase(addNewTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((t) => t._id === action.payload._id ? action.payload : t);
                state.error = null;
                toast.success("Task Updated Succesfully");
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((t) => t._id !== action.payload);
                state.error = null;
                toast.success("Task removed succesfully");
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(getAllComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
                state.error = null;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                //state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            // .addMatcher(
            //     (action) => action.type.endsWith("rejected"),
            //     (state, action) => {
            //         state.loading = false;
            //         // toast.error(action.payload);
            //     }
            // );
    },
});

export default taskSlice.reducer;
