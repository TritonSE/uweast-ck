'use strict';

/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'AbNqWpbV5U5ZLifwBXVD6_DDItmOHCt0_NIfblHNgESIsrKo2O7wZxGufduacyc99C9yjFQdrNPgUQIy';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EBeH6QRWjg2y5pvoA6CXLHCh99MTbPNrRU3IO7V3azdxYHOEM0REGplBQbnMi1m5ePK67FYcg2pKJVH4';

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += await prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}

module.exports = {client: client, prettyPrint:prettyPrint};