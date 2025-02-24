import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Keypair, sendAndConfirmTransaction, PublicKey, Transaction, TransactionInstruction, SendTransactionError } from "@solana/web3.js";
import 'dotenv/config';
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const payer: Keypair = getKeypairFromEnvironment("SECRET_KEY");

const pingProgramId : PublicKey = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");

const dataAccountId: PublicKey = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

const transaction = new Transaction();

const instruction = new TransactionInstruction({
    programId: pingProgramId,
    keys:[
        {
            pubkey: dataAccountId,
            isSigner: false,
            isWritable: true
        }
    ]
});

transaction.add(instruction);


(async () => {
    try {
        const signature = await sendAndConfirmTransaction(connection,transaction,[payer]);
        console.log("Transaction signature:", signature);
    } catch (error) {
        if(error instanceof SendTransactionError){
            console.error("SendTransactionError caught!");
            console.error("Error sending transaction:", error.getLogs(connection));
        }
    }
})();