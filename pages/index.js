
import { ethers, parseUnits } from "ethers";
import Navbar from "../components/navbar";
import { useEthersProvider, useTokenContract, useTokenBalance } from "../hooks";
import { useState } from "react";




export default function Home() {
  const [account, setAccount] = useState(null)
  const [signer, setSigner] = useState();
  const [providers, setProviders] = useState();
  const [tokenAddress, setTokenAddress] = useState('');

  const [recipentAddress, setRecipentAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [chainId, setChainId] = useState('');

  const { tokenContract, decimal } = useTokenContract(signer, account, tokenAddress)
  const { balance } = useTokenBalance(tokenContract, account)



  const HandleRequest = async () => {
    const { account, provider, signer, chainId } = await useEthersProvider()

    setAccount(account);
    setProviders(provider);
    setSigner(signer)
    setChainId(Number(chainId))
  }



  const onchageHandler = (e) => {
    if (!account) return alert("Please connect your wallet")
    let address = e.target.value.trim();
    setTokenAddress(address);
  };





  const transferHandler = async () => {

    try {
      if (!account) return alert("Please enter your account")

      if (!tokenContract && decimal) return alert("Please add token");

      if (!recipentAddress) {
        return alert("Please add recipient Address Address!")

      }
      let amount = (Number(parseUnits(transferAmount.toString(), decimal))).toLocaleString("en-US", { useGrouping: false })
      console.log(recipentAddress, amount, decimal.toString())

      const tx = await tokenContract?.transfer(
        recipentAddress,
        amount
      );
      await tx.wait();
      return alert("token Transfer Successfully!")

    } catch (e) {
      console.log(e)
      return alert(e.reason || e.message || e.data.message)
    }
  };


  let ybalance = (balance).toLocaleString("en-US", { useGrouping: false })
  return (
    <div >

      <Navbar checkIsAuthenticated={HandleRequest} account={account} chainId={chainId} />
      <div className="py-16 bg-gray-50 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
              <div className="bg-white h-screen  lg:h-full sm:h-2/3" />
            </div>
            <div className="relative">
              <div className="text-center">
                <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                  Transfer Balance
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                  insert you token address!
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Token Address
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            disabled={!account}
                            value={tokenAddress}
                            onChange={(e) => onchageHandler(e)}
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder={
                              !account
                                ? "please connect wallet first"
                                : "token address"
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          your Token Balance
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            readOnly
                            value={ybalance}
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="100000"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recipient Address
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            onChange={(e) => setRecipentAddress(e.target.value)}
                            value={recipentAddress}
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="address"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enter Amount you want to Transfer
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(+e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="amount"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={transferHandler}
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
