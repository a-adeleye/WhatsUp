import * as React from 'react';
import {useState} from 'react';

import "../ScamAwareness/ScamAwareness.scss";
import {faCertificate} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addItem} from "../../Utils";
import {DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner} from "office-ui-fabric-react";

library.add(faCertificate);

const ShareYourStory: React.FC<any> = (props) => {
    const {user} = props;
    const [story, setStory] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hideDialog, setHideDialog] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event: any) => {
        const {value} = event.target;
        if (story && !value.trim().length) {
            delete story.Description;
            return;
        }
        setIsError(false);
        setErrorMessage(null);
        setStory({Description: value.trim()});
    }

    const submit = () => {
        setLoading(true);
        setIsError(false);
        setErrorMessage(null);
        story.Email = user.Email;
        story.Title = user.Title;

        toggleDialog();

        addItem("Success Story", story).then(() => {
            setLoading(false);
            setIsSubmitted(true);
        }).catch((error) => {
            setLoading(false);
            console.log(error)
            setErrorMessage('Unable to submit story. Please try again');
        });
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

    const toggleDialog = () => {
        setHideDialog(!hideDialog);
    }

    const handleSubmit = () => {
        if (!Object.entries(story).length) {
            setIsError(true)
            return;
        }
        toggleDialog();
    }

    return (
        <>
            <div className={"orange-section with-form"} data-aos="fade-up">
                <div className="container">
                    <div className="icon">
                        <FontAwesomeIcon icon={"certificate"} size="xl"/>
                    </div>
                    <h1 className="title">SHARE YOUR SUCCESS STORY WITH JETEX!</h1>
                    <div className="description">Do you have a success story in Jetex you&apos;d like to share with the
                        others?
                        You can submit your story (not more than 35 words) and get a chance to be featured in the next
                        edition.
                    </div>
                    {isSubmitted && <p className={"success-message"}>Success story submitted successfully.</p>}
                    {!isSubmitted && <form>
                        {isError && <p className={"error-message"}>Please fill story.</p>}
                        {errorMessage && <p className={"error-message"}>{errorMessage}</p>}
                        <textarea placeholder={"Success story"} onChange={(event) => handleChange(event)}/>
                        <button onClick={handleSubmit} type={"button"}>Submit {loading && <Spinner/>}</button>
                    </form>}
                </div>
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

export default ShareYourStory