import { airdropIfRequired } from "@solana-developers/helpers";
import {
  Connection,
  Transaction,
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  SendTransactionError,
} from "@solana/web3.js";
import keypair from "./01_generate-keypair";

const sender = keypair;
const reciver = Keypair.generate();

const connection = new Connection("http://localhost:8899", "confirmed");


// This program is not working for some reason, learn the concept how to create a transaction.

// await airdropIfRequired(connection, sender.publicKey,1*LAMPORTS_PER_SOL,0.5 * LAMPORTS_PER_SOL);

console.log(await connection.getBalance(sender.publicKey));
console.log(await connection.getBalance(reciver.publicKey));

async function beginTransactionProgram() {
  const transaction = new Transaction();

  const instruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: reciver.publicKey,
    lamports: 5000,
  });

  transaction.add(instruction);

  const sendTransaction = async () => {
    try {
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
      );
      console.log("Transaction signature:", signature);
    } catch (error) {
      if (error instanceof SendTransactionError) {
        console.error("SendTransactionError caught!");
        console.error("Signature:", await error.getLogs(connection));
        //   console.error("Transaction message:", error.transactionMessage);
        //   console.error("Transaction logs:", error.transactionLogs);
        //   console.error("Detailed logs:", await connection.getConfirmedTransaction(error.signature));
      } else {
        console.error("Error sending transaction:", error);
      }
    }
  }

  sendTransaction();
}

beginTransactionProgram();
