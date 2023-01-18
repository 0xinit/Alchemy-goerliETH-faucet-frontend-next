export const checkEarlyAccessNft = async (address) => {
    try {
        const response = await fetch("api/getNftValidation", {
            method: "POST",
            body: JSON.stringify({ address }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
};

export const sendFund = async (address) => {
    console.log(address);
    alert("Waiting for Confirmation");

    try {
        const response = await fetch("api/getGoerli", {
            method: "POST",
            body: JSON.stringify({ address }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert("Transaction succesful!");
        } else {
            alert("Something went wrong in api! ");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong in api! ");
    }
};
