import * as React from "react";
import {useEffect, useState} from "react";
import './Quiz.scss';
import {DefaultButton, Dialog, DialogFooter, DialogType, Image, PrimaryButton, Spinner} from "office-ui-fabric-react";
import {addItem, extractImageUrl, getListItemsByTitle} from "../../Utils";


const Quiz: React.FC<any> = (props) => {
    const {news_letter, user} = props;
    const [quiz, setQuiz] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hideDialog, setHideDialog] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = () => {
        if (!news_letter) {
            return;
        }
        getListItemsByTitle("Quiz", "NewsletterId eq '" + news_letter.Id + "'")
            .then((response) => {
                setQuiz(response);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [news_letter])

    const handleChange = (event: any) => {
        const {id, value} = event.target;
        if (!value.trim().length) {
            delete answer[id];
            return;
        }
        setIsError(false);
        setErrorMessage(null);
        setAnswer({
            ...answer,
            [id]: value.trim()
        });
    }

    const toggleDialog = () => {
        setHideDialog(!hideDialog);
    }

    const submit = () => {
        setSubmitting(true);
        setIsError(false);
        setErrorMessage(null);
        answer.Email = user.Email;
        answer.Name = user.Title;
        answer.QuizID = String(quiz[0].Id);

        toggleDialog();

        addItem("QuizData", answer).then(() => {
            setSubmitting(false);
            setIsSubmitted(true);
        }).catch((error) => {
            console.log(error);
            setErrorMessage('Unable to submit quiz. Please try again');
        });
    }

    const handleSubmit = () => {
        if (Object.entries(answer).length < 3) {
            setIsError(true)
            return;
        }
        toggleDialog();
    }

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Confirm submission',
        closeButtonAriaLabel: 'Close',
        subText: 'Are you sure you want to submit?',
    };

    const dialogStyles = {main: {maxWidth: 450}};

    const modalProps = React.useMemo(
        () => ({
            isBlocking: true,
            styles: dialogStyles,
        }),
        [],
    );

    return (
        <>
            {loading && <div className={"text-center"}>
                <Spinner size={3}/>
            </div>}
            <div className={"quiz"}>
                {quiz.map((item: any) => (
                    <>
                        <p className="heading">{item.QuizQuestion}</p>
                        <div className="quiz-wrapper" key={item.Id}>
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
                        <p className="last-winner">The winner will be selected at random from all correct entries and
                            will receive a gift voucher.<br/>
                            Last month&apos;s winner was <strong>{item?.LastWinner}</strong>
                        </p>
                        {isSubmitted && <p className={"success-message"}>Quiz submitted successfully.</p>}
                        {!isSubmitted && <form action="">
                            {isError && <p className={"error-message"}>Please answer all questions.</p>}
                            {errorMessage && <p className={"error-message"}>{errorMessage}</p>}
                            <input id={"Answer1"} type={"text"} placeholder={"Answer 1*"}
                                   onChange={(event) => handleChange(event)}/>
                            <input id={"Answer2"} type={"text"} placeholder={"Answer 2*"}
                                   onChange={(event) => handleChange(event)}/>
                            <input id={"Answer3"} type={"text"} placeholder={"Answer 3*"}
                                   onChange={(event) => handleChange(event)}/>
                            <button disabled={!answer} onClick={handleSubmit} type={"button"}>Submit {submitting &&
                                <Spinner/>}</button>
                        </form>}
                    </>
                ))}
            </div>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
            >
                <DialogFooter>
                    <PrimaryButton onClick={submit} text="Submit"/>
                    <DefaultButton onClick={toggleDialog} text="Cancel"/>
                </DialogFooter>
            </Dialog>
        </>

    )
}

export default Quiz