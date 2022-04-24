const path = require( 'path' );
const express = require( 'express' );

( async function() {
    
var cors = require('cors')
const { eVRC, EVENTS, MODE } = require('./eVRC');
    const app = express()

    const port = 26453;
    const host = `http://127.0.0.1:${ port }`



let technicak={}


const CardReader = new eVRC()



CardReader.readMode = MODE.BASIC
CardReader.autoRecreate = true
CardReader.on(EVENTS.CARD_INSERTED, () => {
  console.log('EVENT: Card Inserted')
})

CardReader.on(EVENTS.CARD_REMOVED, () => {
  console.log('EVENT: Card Removed')
  technicak={}
})

CardReader.on(EVENTS.READING_INIT, () => {
  console.log('EVENT: Initial Reading')
})

CardReader.on(EVENTS.READING_FAIL, (e) => {
  console.log('EVENT: Reading Fail: ',e)
  technicak={}
})

CardReader.on(EVENTS.READING_PROGRESS, (progress) => {
  console.log(progress)
})

CardReader.on(EVENTS.READING_COMPLETE, (obj) => {
  console.log('EVENT: Final eVRC object recieved')
//  console.dir(obj,{ depth: null })
  technicak=obj

})

CardReader.on(EVENTS.DEVICE_DISCONNECTED, () => {
  console.log('EVENT: Device Disconnect')
  technicak={}
})



CardReader.startListener()

    app.use(cors())

    app.use( '/', express.static( path.join( __dirname, './src/www' ) ) )

    app.use( '/files/images', express.static( path.join( __dirname, './src/static/images' ) ) )

    // endpoint to serve `images.json`

    app.get( '/api/technicak', ( req, res ) => {
        res.contentType( 'application/json' )
//        res.sendFile( path.join( __dirname, './src/static/jsons/images.json' ) )
	res.json(technicak)
    } )

    /*-------------------*/






    app.listen( port, async () => {
        console.log( 'eVRC reader proxy started!' )
        console.log( '(c) 2022 by Slavoj SANTA Hruska' )
        console.log( '-------------------------------' )
	console.log( `Service is available at ${ host }/` )
    } )

} )()