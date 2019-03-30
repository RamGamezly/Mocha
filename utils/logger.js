module.exports = (type, message, module) => {
    var colors = require("colors")
    if (!module) var module = "General Logging"
    switch (type) {
        case "log":
            console.log("Log  ".white + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "warn":
            console.log("Warn ".yellow + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "question":
            console.log("?????".bgMagenta + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "info":
            console.log("Info ".blue + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "done":
            console.log("Done ".green + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "error":
            console.log("Error".red + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "fatal":
            console.log("Fatal".rainbow + " | ".gray + message + " " + `| ${module}`.gray)
            break
        case "debug":
            console.log("Debug".cyan + " | ".gray + message + " " + `| ${module}`.gray)
            break
    }
}