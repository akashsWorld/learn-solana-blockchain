import keyPair from './01_generate-keypair'
import { Connection, PublicKey,LAMPORTS_PER_SOL } from '@solana/web3.js'


const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const balance = async () => {
    const balance = await connection.getBalance(new PublicKey(keyPair.publicKey))
    console.log(`The balance available for ${keyPair.publicKey.toBase58()} is ${balance/LAMPORTS_PER_SOL}`)
}

balance();