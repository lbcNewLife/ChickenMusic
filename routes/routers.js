var express = require('express')
var router = express.Router()
var axios = require('axios')

router.post('/*', (req, res) => {
    console.log(req.url)
    console.log(req.path)
    console.log(req.headers.path)
})
router.get('/getDiscList', (req, res) => {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router
