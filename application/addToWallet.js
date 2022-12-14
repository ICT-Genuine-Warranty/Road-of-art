const fs = require("fs");
const { Wallets } = require("fabric-network");
const path = require("path");

async function main() {
    // Main try/catch block
    try {
        // A wallet stores a collection of identities
        const wallet = await Wallets.newFileSystemWallet("wallet");

        const checkidentity = await wallet.get("appUser");
        if (checkidentity) {
            console.log(
                'An identity for the user "appUser" already exists in the wallet'
            );
            return;
        }

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(__dirname, "/../basic-network/organizations/peerOrganizations");
        const certificate = fs
            .readFileSync(
                path.join(
                    credPath,
                    "/coupang.example.com/users/User1@coupang.example.com/msp/signcerts/User1@coupang.example.com-cert.pem"
                )
            )
            .toString();
        const privateKey = fs
            .readFileSync(
                path.join(credPath, "/coupang.example.com/users/User1@coupang.example.com/msp/keystore/priv_sk")
            )
            .toString();

        // Load credentials into wallet
        const identityLabel = "appUser";

        const identity = {
            credentials: {
                certificate,
                privateKey,
            },
            mspId: "CoupangMSP",
            type: "X.509",
        };

        await wallet.put(identityLabel, identity);
        console.log('Successfully import an user("appUser") into the wallet');
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main();
