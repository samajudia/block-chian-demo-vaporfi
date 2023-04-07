/* eslint-disable @next/next/no-img-element */


import { FunctionComponent, useEffect } from "react";
import { Menu } from "@headlessui/react";
const Walletbar = ({ checkIsAuthenticated, account, chainId }) => {
    console.log(chainId, "chainId")
    const chainHandler = async (parm) => {
        try {
            if (typeof window !== "undefined") {
                // @ts-ignore
                await window?.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: parm }],
                });

                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     if (!account) {
    //         connect();
    //     }
    // }, [account, connect]);
    return (
        <div className="flex">
            <button
                onClick={() => {
                    checkIsAuthenticated()
                    // account ? disconnect() : connect();
                }}
                type="button"
                className=" w-auto inline-flex items-center px-5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >

                {account
                    ? `0x${account[2]}${account[3]}${account[4]}....${account.slice(-4)}`
                    : "Connect Wallet"}
            </button>
            <Menu as="div" className="ml-3 relative">
                <div>
                    <Menu.Button className=" w-auto inline-flex items-center px-5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span>


                            {account
                                ? chainId === 1
                                    ? "Ethereum"
                                    : chainId === 5
                                        ? "Goerli"
                                        : "Wrong chain"
                                : "select chain"}
                        </span>
                    </Menu.Button>
                </div>

                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-auto px-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        <>
                            <Menu.Button
                                className="text-xs px-5 text-black"
                                onClick={() => chainHandler("0x1")}
                            >
                                {" "}
                                Ethereum
                            </Menu.Button>
                            <br />
                            <Menu.Button
                                className="text-xs px-5 border-blue-500 text-black"
                                onClick={() => chainHandler("0x5")}
                            >
                                {" "}
                                <span>Goerli</span>
                            </Menu.Button>
                        </>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default Walletbar;
