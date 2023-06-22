import * as React from 'react';
import {useState} from 'react';

import "../ScamAwareness/ScamAwareness.scss";
import {addItem} from "../../Utils";
import {DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner} from "office-ui-fabric-react";


const BrightIdeas: React.FC<any> = (props) => {
    const {user} = props;
    const [idea, setIdea] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hideDialog, setHideDialog] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleChange = (event: any) => {
        const {value} = event.target;
        if (idea && !value.trim().length) {
            delete idea.Description;
            return;
        }
        setIsError(false);
        setErrorMessage(null);
        setIdea({Description: value.trim()});
    }

    const toggleDialog = () => {
        setHideDialog(!hideDialog);
    }

    const submit = () => {
        setLoading(true);
        setIsError(false);
        setErrorMessage(null);

        idea.Email = user.Email;
        idea.Title = user.Title;

        toggleDialog();

        addItem("Bright Ideas", idea).then(() => {
            setLoading(false);
            setIsSubmitted(true);
        }).catch((error) => {
            console.log(error)
            setLoading(false);
            setErrorMessage('Unable to submit idea. Please try again');
        });
    }

    const handleSubmit = () => {
        if (!Object.entries(idea).length) {
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
            <div className={"orange-section with-form"}>
                <div className="container">
                    <div className="icon">
                        <img alt="" src={require('../../assets/ideas.png')}/>
                    </div>
                    <h1 className="title">BRIGHT IDEAS!</h1>
                    <div className="description">We rely on our excellent team to share their innovative ideas to propel
                        us higher than we have ever imagined.
                    </div>
                    {isSubmitted && <p className={"success-message"}>Idea submitted successfully.</p>}
                    {!isSubmitted && <form>
                        {isError && <p className={"error-message"}>Please fill idea.</p>}
                        {errorMessage && <p className={"error-message"}>{errorMessage}</p>}
                        <textarea placeholder={"Enter your idea"} onChange={(event) => handleChange(event)}/>
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

export default BrightIdeas