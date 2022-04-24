const { eVRC, EVENTS, MODE } = require('./eVRC')

let technicak={}

const reader = new eVRC()
reader.readMode = MODE.BASIC
reader.autoRecreate = true
reader.on(EVENTS.CARD_INSERTED, () => {
  console.log('EVENT: Card Inserted')
})

reader.on(EVENTS.CARD_REMOVED, () => {
  console.log('EVENT: Card Removed')
})

reader.on(EVENTS.READING_INIT, () => {
  console.log('EVENT: Initial Reading')
})

reader.on(EVENTS.READING_FAIL, (e) => {
  console.log('EVENT: Reading Fail: ',e)
})

reader.on(EVENTS.READING_PROGRESS, (progress) => {
  console.log(progress)
})

reader.on(EVENTS.READING_COMPLETE, (obj) => {
  console.log('EVENT: Final eVRC object')
  console.dir(obj,{ depth: null })
})

reader.on(EVENTS.DEVICE_DISCONNECTED, () => {
  console.log('EVENT: Device Disconnect')
});


( async function() {

reader.startListener()


} )();