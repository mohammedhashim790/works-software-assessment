export const ResponseStatus = {
    OK: (res: any, data?: any) => res.status(200).json({data}),

    BAD_REQUEST: (res: any, message: string, error?: any) => res.status(400).json({message, error}),

    NOT_FOUND: (res: any, message: string, error?: any) => res.status(404).json({message, error}),

    INTERNAL_SERVER_ERROR: (res: any, message: string, error?: any) => res.status(500).json({
        message, error
    }),
};

