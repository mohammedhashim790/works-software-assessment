export function logInfo(...obj: any) {
    console.log(obj.join(" "));
}

export function logError(message: string, exception?: any) {
    console.error({
        message: message, ...(exception != null && {exception})
    });
}



