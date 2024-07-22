const express = require("express");
const {
    handelCreateNewShortUrl,
    handleGetRedirectedUrl,
    handleAnalyticsById,
    handleDeleteUrlById
} = require("../controller/url")

const router = express.Router()

router.post("/", handelCreateNewShortUrl )

router.route("/:shortId").get( handleGetRedirectedUrl ).delete(handleDeleteUrlById)

router.get("/analytics/:shortId", handleAnalyticsById ) 


module.exports= router;