import {oneUserType} from "../../Redux/users-reducer";

type newObjPropsType = {
    followed: boolean
}

export const updateObjectInArray = (users:  Array<oneUserType>,
                                    itemId: number,
                                    objPropName: keyof oneUserType,
                                    newObjProps: newObjPropsType) => {
    return users.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}