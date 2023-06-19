import * as React from "react";
import {useState} from "react";
import './Quiz.scss';
import {Image, Spinner} from "office-ui-fabric-react";
import {addItem, extractImageUrl} from "../../Utils";

const Quiz: React.FC<any> = (props) => {
    const {quiz, user} = props;
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event: any) => {
        const {id, value} = event.target;
        if (!value.trim().length) {
            delete answer[id];
            return;
        }
        setAnswer({
            ...answer,
            [id]: value.trim()
        });
    }

    const handleSubmit = () => {
        if (Object.entries(answer).length < 3) {
            setIsError(true)
            return;
        }
        setLoading(true);
        setIsError(false);
        answer.Email = user.Email;
        answer.Name = user.Title;

        addItem("QuizData", answer).then(() => {
            setLoading(false);
            setIsSubmitted(true);
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className={"quiz"}>
            {quiz.map((item: any, index: number) => (
                <>
                    <p className="heading">{item.QuizQuestion}</p>
                    <div className="quiz-wrapper" key={index}>
                        <div className="quiz-item">
                            <Image src={extractImageUrl(item.Image1)} alt={"quiz-image"}/>
                            <p className="title">1</p>
                        </div>
                        <div className="quiz-item">
                            <Image src={extractImageUrl(item.Image2)} alt={"quiz-image"}/>
                            <p className="title">2</p>
                        </div>
                        <div className="quiz-item">
                            <Image src={extractImageUrl(item.Image3)} alt={"quiz-image"}/>
                            <p className="title">3</p>
                        </div>
                    </div>
                    <p className="last-winner">The winner will be selected at random from all correct entries and will
                        receive a gift voucher.<br/>
                        Last month's winner was <strong>{item?.LastWinner}</strong>
                    </p>
                    {isSubmitted && <p className={"success-message"}>Quiz submitted successfully.</p>}
                    {!isSubmitted && <form action="">
                        {isError && <p className={"error-message"}>Please answer all questions.</p>}
                        <input id={"Answer1"} type={"text"} placeholder={"Answer 1*"}
                               onChange={(event) => handleChange(event)}/>
                        <input id={"Answer2"} type={"text"} placeholder={"Answer 2*"}
                               onChange={(event) => handleChange(event)}/>
                        <input id={"Answer3"} type={"text"} placeholder={"Answer 3*"}
                               onChange={(event) => handleChange(event)}/>
                        <button disabled={!answer} onClick={handleSubmit} type={"button"}>Submit {loading &&
                            <Spinner/>}</button>
                    </form>}
                </>
            ))}

        </div>
    )
}

export default Quiz