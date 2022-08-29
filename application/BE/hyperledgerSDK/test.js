const sdk = require('./getHistory')
async function main() {

    const res = await sdk.getHistory(1);
    console.log("res=")
    console.log(res)
}

main()