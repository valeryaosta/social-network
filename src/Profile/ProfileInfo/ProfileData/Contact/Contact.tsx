import React from "react";
import s from "../../../ProfileInfo.module.css";

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>:{contactValue}
    </div>
}

export default Contact;