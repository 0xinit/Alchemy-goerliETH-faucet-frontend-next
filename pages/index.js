import Head from "next/head";
import { useEffect, useState } from "react";
import { checkEarlyAccessNft, sendFund } from "../services";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [address, setAddress] = useState("");

    const handleValidation = async (_address) => {
        const addressHaveNft = await checkEarlyAccessNft(_address);
        if (addressHaveNft) {
            await sendFund(_address);
        } else {
            alert("You don't have a Early Access NFT");
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your wallet address"
                />
                <button onClick={() => handleValidation(address)}>
                    Click to get Test Goerli
                </button>
            </div>
        </div>
    );
}
