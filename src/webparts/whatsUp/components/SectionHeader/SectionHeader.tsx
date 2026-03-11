import * as React from 'react';
import "./SectionHeader.scss";
import {ISectionHeaderProps} from "./SectionHeader.types";

const SectionHeader: React.FC<ISectionHeaderProps> = ({topText, bottomText, subtitle}) => {
    const topTextClassName = topText
        ? "section-header__top-text"
        : "section-header__top-text";

    return (
        <div className="section-header">
            <div className={topTextClassName}>
                {topText || ""}
            </div>

            <div className="section-header__pill">
                <div className="section-header__bottom-text">
                    {bottomText}
                </div>

                <div className="section-header__subtitle">
                    {subtitle}
                </div>
            </div>
        </div>
    );
};

export default SectionHeader;
