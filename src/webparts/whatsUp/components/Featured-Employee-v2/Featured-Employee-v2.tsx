import * as React from 'react';
import {useEffect, useState} from 'react';

import "./Featured-Employee-v2.scss";
import {extractImageUrl, getListItemsByTitle} from "../../Utils";
import {Image, Spinner} from "office-ui-fabric-react";
import SectionHeader from "../SectionHeader/SectionHeader";

const getHtmlContent = (value: string | undefined): string => {
    return typeof value === "string" ? value.trim() : "";
};

const FeaturedEmployeeV2: React.FC<any> = (props) => {
    const {news_letter} = props;
    const [featuredEmployee, setFeaturedEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const employeeName = featuredEmployee?.EmployeeName?.trim() || "";
    const employeeTitle = featuredEmployee?.Title?.trim() || "";
    const imageCaption = featuredEmployee?.ImageCaption?.trim() || "";
    const featuredImageUrl = extractImageUrl(featuredEmployee?.Image);

    const interviewQuestions = [
        {
            question: "What do you enjoy most about working in Jetex?",
            answer: getHtmlContent(featuredEmployee?.EnjoyMost),
        },
        {
            question: "What's the biggest challenge you face in your job?",
            answer: getHtmlContent(featuredEmployee?.BiggestChallenge),
        },
        {
            question: "What has been your greatest achievement so far during your time with Jetex?",
            answer: getHtmlContent(featuredEmployee?.Achievement),
        },
    ].filter((item) => item.answer);

    const hasProfile = Boolean(featuredImageUrl || employeeName || employeeTitle);
    const hasContent = Boolean(imageCaption || interviewQuestions.length || hasProfile);

    const bodyClassName = [
        "featured-v2__body",
        !hasProfile ? "featured-v2__body--no-profile" : "",
        !interviewQuestions.length ? "featured-v2__body--no-questions" : "",
    ].filter(Boolean).join(" ");

    useEffect(() => {
        if (!news_letter) {
            setFeaturedEmployee(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        getListItemsByTitle("FeaturedEmployee", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setFeaturedEmployee(response?.[0] || null);
                setLoading(false);
            })
            .catch(() => {
                setFeaturedEmployee(null);
                setLoading(false);
            });
    }, [news_letter]);

    if (loading) {
        return (
            <div className={"text-center"}>
                <Spinner size={3}/>
            </div>
        );
    }

    if (!hasContent) {
        return null;
    }

    return (
        <div className={"featured-v2"}>
            <div className={"featured-v2__intro"}>
                <SectionHeader
                    topText="Featured"
                    bottomText="Employees"
                    subtitle={imageCaption}
                />
            </div>
            <div className={bodyClassName}>
                {interviewQuestions.length > 0 && <div className={"featured-v2__questions"}>
                    {interviewQuestions.map((item, index) => (
                        <div className={"featured-v2__question"} key={index}>
                            <p className={"featured-v2__question-title"}>{item.question}</p>
                            <div
                                className={"featured-v2__answer"}
                                dangerouslySetInnerHTML={{__html: item.answer}}
                            />
                        </div>
                    ))}
                </div>}
                {hasProfile && <aside className={"featured-v2__profile"}>
                    {featuredImageUrl && <div className={"featured-v2__image"}>
                        <Image src={featuredImageUrl} alt={employeeName || "Featured employee"}/>
                    </div>}
                    {(employeeName || employeeTitle) && <div className={"featured-v2__profile-card"}>
                        {employeeName && <b>{employeeName}</b>}
                        {employeeTitle && <span>{employeeTitle}</span>}
                    </div>}
                </aside>}
            </div>
        </div>
    );
}

export default FeaturedEmployeeV2
