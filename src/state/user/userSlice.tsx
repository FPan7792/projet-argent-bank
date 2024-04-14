import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isConnected: boolean;
  credentials?: {
    email: Readonly<string>;
    firstName: Readonly<string>;
    lastName: Readonly<string>;
    userName: string;
    id: Readonly<string>;
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
    builder
      .addCase(asyncUpdateUserInfos.pending, () => {
        console.log("updating user");
      })
      .addCase(
        asyncUpdateUserInfos.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.credentials) {
            return (state = {
              ...state,
              credentials: { ...state.credentials, userName: action.payload },
            });
          }
        }
      );
  },
});

type APIResponse = {
  status: number;
  message: string;
};

interface UserResponse extends APIResponse {
  body?: {
    token: string;
  };
}

interface UserInfosResponse extends APIResponse {
  body?: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

interface UserUpdateResponse extends APIResponse {
  body?: {
    id: string;
    email: string;
  };
}

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

export const asyncUpdateUserInfos = createAsyncThunk(
  "user/asyncUpdateUserInfos",
  async (credentials: string) => {
    try {
      const { token, updatedInfo, newValue } = JSON.parse(credentials);

      let sentDatas: Record<string, string> = {};
      sentDatas[updatedInfo] = newValue;

      if (token && updatedInfo && newValue) {
        const updateInfo = await fetch(
          "http://127.0.0.1:3001/api/v1/user/profile",
          {
            method: "PUT",
            credentials: "same-origin",
            body: JSON.stringify(sentDatas),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData: UserUpdateResponse = await updateInfo.json();
        if (userData.status !== 200) {
          throw new Error("user couldn't be updated");
        } else return newValue;
      } else
        throw new Error(
          "some credentials are missing in order to reach update"
        );
    } catch (error) {
      throw error;
    }
  }
);

// Action creators are generated for each case reducer function
export const { getUser, updateUser, setConnection, logOut } = userSlice.actions;

export default userSlice.reducer;
