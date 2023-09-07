import React from "react";
import styles from "./StudySection.module.css"
import SmallPhone from "../PhoneLayout/SmallPhone";

export default function StudySection() {
    return (
        <div id={styles[`study_section`]}>
            <h1>HI</h1>
            <SmallPhone />
        </div>
    )
}