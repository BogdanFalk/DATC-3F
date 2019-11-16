var textColor = require(__dirname + "/textColor.js")

function testLogging() {
    LOG(__filename, 17, "TEST LOG")
    ERR(__filename, 18, "TEST ERR")
    DBG(__filename, 19, "TEST DBG")
}

function LOG(file, line, msg) {
    console.log("\x1b[32m"+"LOG:"+"\x1b[37m"+ " File "+"\x1b[32m"+file+"\x1b[37m"+" | Line "+"\x1b[32m"+line+"\x1b[37m"+" | "+"\x1b[32m"+msg+"\x1b[37m")
}

function ERR(file, line, msg) {

    console.error("\x1b[31m"+"ERR:"+"\x1b[37m"+ " File "+"\x1b[31m"+file+"\x1b[37m"+" | Line "+"\x1b[31m"+line+"\x1b[37m"+" | "+"\x1b[31m"+msg+"\x1b[37m")
}

function DBG(file, line, msg) {

    console.debug("\x1b[33m"+"DBG:"+"\x1b[37m"+ " File "+"\x1b[33m"+file+"\x1b[37m"+" | Line "+"\x1b[33m"+line+"\x1b[37m"+" | "+"\x1b[33m"+msg+"\x1b[37m")
}

function GOD(msg)
{
    console.log("\x1b[34m"+" "+msg+"\x1b[37m");
}

module.exports =
    {
        LOG: LOG,
        ERR: ERR,
        DBG: DBG,
        GOD: GOD,
        testLogging: testLogging,
        textColor: textColor
    }