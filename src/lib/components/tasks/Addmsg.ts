

export let msg : {} | null = null;

export async function setMsg(toE : string, subjectE : string, textE : string, htmlE : string){
    const msgNew = {
        to: toE,
        from:  "wt028615@gmail.com",
        subject: subjectE,
        text: textE,
        html: htmlE,
    };

    msg = msgNew;
}