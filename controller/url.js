const shortid = require("shortid");
const URL = require("../model/url")

async function handelCreateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg : "url is required"})
    const shortId = shortid()

    await URL.create({
        shortId : shortId,
        redirectedUrl : body.url,
        visitedHistory :[],
        createdBy : req.user.id,
    })

    return res.render("home",{id :shortId })

}

async function handleGetRedirectedUrl(req, res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        { shortId : shortId },{ $push : {
            visitedHistory : { timeStamp : Date.now() }
        }}
    )

    res.redirect(entry.redirectedUrl)
}

async function handleAnalyticsById(req, res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({ totalClicks : result.visitedHistory.length, results : result.visitedHistory})
}

async function handleDeleteUrlById(req, res){
    const shortId = req.params.shortId
    await URL.findOneAndDelete({shortId})
    res.json({msg : "URL is Deleted"})
}

module.exports  ={
    handelCreateNewShortUrl,
    handleGetRedirectedUrl,
    handleAnalyticsById,
    handleDeleteUrlById
}