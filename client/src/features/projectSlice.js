import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../api/axios';
import socket from '../socket/socket';



export const setupProjectSocketListeners = (store) => {

  const {dispatch, getState} = store;
  socket.on("project:created", (project) => {
    dispatch({
      type: "project/socketCreate",
      payload: project,
    });
  });

  // socket.on("project:updated", (project) => {
  //   dispatch({
  //     type: "project/socketUpdate",
  //     payload: project,
  //   });
  // });
  socket.on("project:memberAdded", (project) => {
    dispatch({
      type: "project/socketMemberAdded",
      payload: project,
    });
  });

  socket.on("project:memberRemoved", ({ projectId }) => {
    dispatch({
      type: "project/socketMemberRemoved",
      payload: projectId,
    });
  });

  socket.on("project:updated", (project) => {
    dispatch({
      type: "project/socketUpdate",
      payload: project,
    });
  });

  socket.on("project:deleted", (projectId) => {
    dispatch({
      type: "project/socketDelete",
      payload: projectId,
    });
  });
};


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

  reducers: {
    socketCreate: (state, action) => {
      const exists = state.projects.find(
        (p) => p._id === action.payload._id
      );
      if (!exists) state.projects.push(action.payload);
    },

    socketUpdate: (state, action) => {
      state.projects = state.projects.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    },

    socketDelete: (state, action) => {
      state.projects = state.projects.filter(
        (p) => p.projectId !== action.payload
      );
    },
    socketMemberAdded: (state, action) => {
      const exists = state.projects.find(
        (p) => p._id === action.payload._id
      );

      // If user is newly added, push project
      if (!exists) {
        state.projects.push(action.payload);
      }
    },

    socketMemberRemoved: (state, action) => {
      state.projects = state.projects.filter(
        (p) => p.projectId !== action.payload
      );
    },
  },

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

export const {
  projectCreated,
  projectUpdated,
  projectDeleted,
  memberAddedRealtime,
  memberRemovedRealtime,
} = projectSlice.actions;

export default projectSlice.reducer;