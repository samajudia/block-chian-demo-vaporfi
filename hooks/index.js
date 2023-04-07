import { Contract, ethers } from "ethers";
import tokenAbi from "../json/token.json"
import { useEffect, useState } from "react";
export const useEthersProvider = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("ethereum")
            // return toast("No ethereum wallet found");
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const { chainId } = await provider.getNetwork()

        if (+accounts.length > 0) {
            const signer = await provider.getSigner();
            let account = accounts[0]
            return { account, provider, signer, chainId }
        }
    } catch (error) {
        console.log(error);
        // toast.error(error.message);
    }
};

export const useTokenContract = (signer, account, tokenAddress) => {
    const [tokenContract, setTokenContract] = useState(null);
    const [balance, setBalance] = useState(0);
    const [decimal, setDecimal] = useState(null);

    useEffect(() => {
        (async () => {
            try {

                if (tokenAddress && account) {
                    const contract = new Contract(tokenAddress, tokenAbi, signer);
                    if (contract) {
                        setTokenContract(contract);
                        const balance = await contract.balanceOf(account);
                        setBalance(parseFloat(balance));
                        const decimals = await contract.decimals();
                        setDecimal(decimals);

                    }
                }
            } catch (e) {
                console.log(e);
            }
        })();

    }, [tokenAddress, account, signer]);


    return { tokenContract, balance, decimal }
}






export const useTokenBalance = (contract, account) => {

    const [balance, setBalance] = useState(0);


    useEffect(() => {
        (async () => {
            try {

                if (contract && account) {
                    if (contract) {
                        const balance = await contract.balanceOf(account);
                        setBalance(balance);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        })();

    }, [contract, account]);


    return { balance }
}


// useTokenBalance
// 0x641F00FCF65461852Dd6B74dc1df16F06f30EC0D

//owner
// 0xbb17CDC95b626c76E934Df7bF05fEaEFcEa9C61E