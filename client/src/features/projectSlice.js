import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';

//Fetch All Projects
export const fetchAllProjects = createAsyncThunk(
  "project/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/project/getAll");
      if (!data.success) throw new Error(data.message);
      return data.projects;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//Fetch Project Of User
export const fetchProjectOfUser = createAsyncThunk(
  "project/fetchProjectOfUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/project/get");
      if (!data.success) throw new Error(data.message);
      return data.projects;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//Create Project
export const createProject = createAsyncThunk(
  "project/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/project/create", projectData);
      if (!data.success) throw new Error(data.message);
      return data.project;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//Update Project
export const updateProject = createAsyncThunk(
  "project/update",
  async (projectData, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/project/update/${projectData.projectId}`, projectData);
      if (!data.success) throw new Error(data.message);
      return data.project;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//Delete Project
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/project/delete/${projectId}`);
      if (!data.success) throw new Error(data.message);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//Add Member 
export const addMember = createAsyncThunk(
  "project/addMember",
  async ({ member, projectId }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/project/addMember/${projectId}`,
        { member }
      );
      if (!data.success) throw new Error(data.message);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// REMOVE MEMBER
export const removeMember = createAsyncThunk(
  "project/removeMember",
  async ({ member, projectId }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/project/deleteMember/${projectId}`,
        { member }
      );
      if (!data.success) throw new Error(data.message);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH ALL / USER PROJECTS
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchProjectOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.error = null;
        toast.success("Project created successfully");
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.map((p) => p._id === action.payload._id ? action.payload : p);
        state.error = null;
        toast.success("Project updated successfully");
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (p) => p.projectId !== action.payload
        );
        state.error = null;
        toast.success("Project deleted successfully");
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // MEMBER OPS
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload);
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // ERRORS
      // .addMatcher(
      //   (action) => action.type.endsWith("rejected"),
      //   (state, action) => {
      //     state.loading = false;
      //     // toast.error(action.payload);
      //   }
      // );
  },
});

export default projectSlice.reducer;