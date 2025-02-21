import "dotenv/config";
// import { Keypair } from "@solana/web3.js"; // TO generate a new KeyPair.
import {getKeypairFromEnvironment} from '@solana-developers/helpers';

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(keypair.publicKey.toBase58());

export default keypair.publicKey.toBase58();