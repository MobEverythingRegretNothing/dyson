const { publishMessage } = require('./clients/sns');
exports.handler = async (event) => {
    //sample SNS event https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
    const discordMessage = (JSON.parse(event.Records[0].Sns.Message)).content;
    const discordMessageObject = event.Records[0].Sns.Message

    console.log(discordMessage);

    if (discordMessage === 'tight') {
        await publishMessage('dyson-tight', discordMessage);
    } else if (discordMessage === 'wtf') {
        await publishMessage('dyson-wtf-react', discordMessage);
    } else if (discordMessage.substring(0, 3) === 'c4m') {
        await publishMessage('dyson-c4m', discordMessage);
    } else if (discordMessage.substring(0, 2) === 'yt') {
        await publishMessage('dyson-play-audio', discordMessageObject);
    }
}