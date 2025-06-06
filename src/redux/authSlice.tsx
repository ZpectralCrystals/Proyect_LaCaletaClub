import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabase";
import type { AppDispatch } from "@/store";

// slice siempre requiere un estado inicial
// user => object, loading => bool, error => objeto
const initialState = {
  user: null,
  loading: true,
  error: null,
};

/**
 * createSlice({
 *  name: "Es un tipo de identificador único, es decir, ningún otro slice puede usar el mismo nombre",
 *  initialState: "Este recibe el objeto con la información inicial a guardar",
 *  reducers: "Es un conjunto de funciones que van a permitir cambiar el valor del estado inicial"
 * })
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // state: Es el estado actual, por defecto vale lo mismo que initialState
    // action: Es un objeto donde vamos a encontrar la data que el usuario envía
    setUser: (state, action) => {
      state.user = action.payload;
      // just in case, limpiamos el error
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;

// Asegúrate de que la ruta sea correcta

export const getSession = () => async (dispatch: AppDispatch) => {
  // inicia la carga
  dispatch(setLoading(true));
  try {
    const { data } = await supabase.auth.getSession();
    dispatch(setUser(data.session?.user || null));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    dispatch(setUser(data.user));

    return { success: true, data };
  } catch (error) {
    dispatch(setError(error));
    return { success: false, error };
  }
};

export const signUpWithEmail =
  (email: string, password: string, metadata: Record<string, unknown>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      dispatch(setUser(data.user));
      return { success: true, data };
    } catch (error) {
      dispatch(setError(error));
      return { success: false, error };
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await supabase.auth.signOut();
    dispatch(clearUser());
    return { success: true };
  } catch (error) {
    dispatch(setError(error));
    return { success: false, error };
  }
};

export default authSlice.reducer;
