var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 3 || system.args.length > 5)
{
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
}
else
{
    address = system.args[1];
    output = system.args[2];
    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf")
    {
        size = system.args[3].split('*');
    }
    // page.paperSize = {
    //     format: "Letter",
    //     orientation: 'portrait',
    //     margin: {
    //         left: "0.5in",
    //         top: "0.5in",
    //         right: "0.5in"
    //     }
    // };
    page.viewportSize = {
        width: 1280,
        height: 2400
    };
    // if (system.args.length > 4) {
    // }
    page.zoomFactor = 1
    page.open(address, function(status) {
        if (status !== 'success')
        {
            console.log('Unable to load the address!');
            phantom.exit();
        }
        else
        {
            window.setTimeout(function() {
                console.log("rendering")
                page.render(output);
                console.log("goodbye...")
                phantom.exit();
            }, 400);
        }
    });
}
