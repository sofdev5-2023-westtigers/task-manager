
export let date = '';
export let dates = [];
export let showPickDate = false;
export let showPickDates = false;

export function setDate(newDate){
    date = newDate;
    showPickDate = true;
}

export function setDates(newDates){
    dates = newDates;
    showPickDates = true;
}

export function setFalsePicks(){
    showPickDate = false;
    showPickDates = false;
}