interface Email {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}

export let msg : Email = { 
    to: "melmune@gmail.com",
    from: "wt028615@gmail.com",
    subject: "Example mail!",
    text: "This is an example mail!",
    html: "Sendgrid is working",
};

export async function setMsg(toE : string, subjectE : string, textE : string, htmlE : string){
    const msgNew = {
        to: toE,
        from:  "wt028615@gmail.com",
        subject: subjectE,
        text: textE,
        html: htmlE,
    };

    msg = msgNew;
    console.log(msg);
}

export function getMsg() : Email{
    return msg;
}