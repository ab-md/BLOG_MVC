const notFoundPage = (req, res) => {
    return res.status(404).render("errors/404", {
        layout: "layouts/public",
        title: "Page Not Found",
        user: {}
    })
}

const serverError = (err, req, res, next) => {

    console.error(err);

    if (req.method !== "GET") {
        const statusCode = err.statusCode || 500;
        if (err.code === 11000) {
            return res.status(409).json({
                statusCode: 409,
                error: {
                    message: "Email already exists",
                }
            });
        }
        return res.status(statusCode).json({
            statusCode,
            error: {
                message: err.message || "Internal Server Error"
            }
        })
    }

    return res.status(500).render("errors/500", {
        layout: "layouts/public",
        title: "Server Error"
    });
};

export {
    // notFound,
    notFoundPage,
    serverError
}