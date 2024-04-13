import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isConnected: boolean;
  credentials?: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    id: string;
  };
  sessionToken?: string;
}

const initialState: UserState = {
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setConnection: (state) => {
      switch (!state.sessionToken) {
        case true:
          state = { ...state, isConnected: false };
          break;
        case false:
          state = { ...state, isConnected: true };
          break;
        default:
          state = { ...state };
          break;
      }
    },
    logOut: (state) => {
      console.log(state);
      return (state = { ...initialState });
    },
    getUser: (state, { payload }) => {
      return (state = { ...state, credentials: payload.credentials });
    },
    updateUser: (state, action: PayloadAction<UserState["credentials"]>) => {
      return (state = { ...state, credentials: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAsyncConnection.pending, () => {
        console.log("fetching");
      })
      .addCase(
        setAsyncConnection.fulfilled,
        (state, action: PayloadAction<UserResponse["body"]>) => {
          return (state = {
            ...state,
            isConnected: true,
            sessionToken: action.payload?.token,
          });
        }
      );
    builder
      .addCase(asyncGetUser.pending, () => {
        console.log("fetching user");
      })
      .addCase(
        asyncGetUser.fulfilled,
        (state, action: PayloadAction<UserInfosResponse["body"]>) => {
          return (state = {
            ...state,
            credentials: action.payload,
          });
        }
      );
  },
});

// export type BadRequest = {
//   status: number;
//   message: string;
// };

type UserResponse = {
  message: string;
  status: number;
  body?: {
    token: string;
  };
};

type UserInfosResponse = {
  message: string;
  status: number;
  body?: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};

export const setAsyncConnection = createAsyncThunk(
  "user/asyncConnexion",
  async (credentials: string) => {
    try {
      const getConnexion = await fetch(
        "http://127.0.0.1:3001/api/v1/user/login",
        {
          method: "POST",
          body: credentials,
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const connexionData: UserResponse = await getConnexion.json();
      if (connexionData.status !== 200) {
        throw new Error("no data fetched");
      } else return connexionData.body;
    } catch (error) {
      throw error;
    }
  }
);

export const asyncGetUser = createAsyncThunk(
  "user/asyncGetUser",
  async (token: string) => {
    try {
      const getUser = await fetch("http://127.0.0.1:3001/api/v1/user/profile", {
        method: "POST",
        //   body: credentials,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData: UserInfosResponse = await getUser.json();
      if (userData.status !== 200) {
        throw new Error("no user fetched");
      } else return userData.body;
    } catch (error) {
      throw error;
    }
  }
);

// Action creators are generated for each case reducer function
export const { getUser, updateUser, setConnection, logOut } = userSlice.actions;

export default userSlice.reducer;
