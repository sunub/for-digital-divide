import React from "react";
import Search from "../Search/index"
import PhoneLayout from "../PhoneLayout/index"
import styles from "./StudySection.module.css"

export default function StudySection() {
    return (
        <div id={styles[`study_section`]}>
            <PhoneLayout>
                <Search />
            </PhoneLayout>
        </div>
    )
}