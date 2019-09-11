export const PLUS='PLUS';
export const MINUS='MINUS';

export function add() {
    return {
        type: PLUS,
        num: 1
    }
}

export function sub() { 
    return { 
        type: MINUS, 
        num: 1
    }
}
