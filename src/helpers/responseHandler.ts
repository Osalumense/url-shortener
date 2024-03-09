
export const successResponse = (code: Number = 200, data: any, message: string) => {
    return {
        status: "success",
        code: code,
        data: data,
        message: message,
    };
};

export const errorResponse = (code: Number = 500, data: any, message: string) => {
    return {
        status: "error",
        code: code,
        data: data,
        message: message,
    };
};
