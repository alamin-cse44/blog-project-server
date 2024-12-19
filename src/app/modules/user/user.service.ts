import { IUser, TLoginUser } from "./user.interface"
import { User } from "./user.model"


const registerUserIntoDB = async(payload: IUser) => {

    const result = await User.create(payload)

    return result;
}


const loginUserIntoDB = async(payload: TLoginUser) => {
    if(payload?.email && payload?.password){
        return await User.findOne({ email: payload?.email, password: payload?.password})
    }
}


export const UserServices = {
    registerUserIntoDB,
    loginUserIntoDB,

}