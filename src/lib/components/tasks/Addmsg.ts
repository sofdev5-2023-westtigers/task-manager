

export let msg : {} | null = null;

export async function setMsg(msgNew : Object | null){
    msg = msgNew;
}