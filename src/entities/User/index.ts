export type { UserSchema, UserData } from './model/types/user';
export { userReducer } from './model/slice/userSlice';
export {
    signIn, signUp, logOut, checkIsAuth,
} from './model/actions/userActions';
export {
    getUserData, getUserError, getUserLoading, getUserIsAuth,
} from './model/selectors/userSelectors';
