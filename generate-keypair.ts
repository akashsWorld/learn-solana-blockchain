import { Keypair } from "@solana/web3.js";


const keypair = Keypair.generate();


export default keypair.publicKey.toBase58();