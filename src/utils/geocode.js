const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=b49a567d1b725fc742f9a0519748033d&query=' + encodeURIComponent(address) + '&limit=1'

    request({ url: url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to position service!', undefined)
        } else if (body.error) {   // do kết quả trả về trong TH này ko có phần data nên phải xét không có phần data trong kết quả trả về 
            callback('Unable to find position! Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode