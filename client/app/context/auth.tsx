'use client'
import axios from "../util/api/axios";
import { User } from "../util/types";
import { createContext, useContext, useEffect, useReducer } from "react";

interface State {
    authenticated : boolean;
    user :User | undefined;
    loading: boolean;
}

interface Action {
    type : string,
    payload : any;
}

const StateContext = createContext<State>({
    authenticated:false,
    user:undefined,
    loading : true,
});


const DispatchContext = createContext<any>(null);

//useReducer 사용하기
const reducer = (state:State, {type ,payload } : Action) => {

    switch(type) {
        case "LOGIN" :
            return {
                ...state,
                authenticated : true,
                user : payload
            }
        case "LOGOUT" :
            return {
                ...state,
                authenticated : false,
                user : null
            }
        case "STOP_LOADING" :
            return {
                ...state,
                loading : false,
            }
        default : throw new Error("Unknown action type: ${type}")
    }
}

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        user : null,
        authenticated: false,
        loading:true,
    });

    const dispatch = (type : string, payload? : any) => {
        // console.log('type', type, payload);
        defaultDispatch({type,payload});
    }

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await axios.get('/auth/me');
                // console.log('resr결과보기 me', res.data );
                dispatch("LOGIN", res.data);
            }catch (error) {
                console.log(error,'에러임다');
            }finally {
                dispatch('STOP_LOADING');
            }
        }
        loadUser();
    },[]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}


export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);