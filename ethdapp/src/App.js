import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { GiTroll } from "react-icons/gi";
import abi from "./abi/abi.json";
import data from "./data/data.json";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [nfts, setNfts] = useState(data);

  const balance = async () => {
    const contract = new ethers.Contract(
      "0x0435c4169C37ba32721dB46F2C06B7D11991db3D",
      abi,
      provider
    );
    const tempBalance = await contract.balanceOf(
      "0x8b96A27A5fdbA39Ac5FD0c71d6368BDDB8349699"
    );
    console.log(tempBalance.toString());
  };

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      setAccount(accounts[0]);
    } else {
      console.log("Please Install Metamask.");
    }

    return <div className="App">hello</div>;
  };

  useEffect(() => {
    initConnection();
    console.log(nfts.list);
  }, []);

  return (
    <div className="page">
      <div className="header">
        <img src={require(`./assets/images/logo.png`)} className="artIcon" />
        <p>
          11/15
          <span>
            {" "}
            <GiTroll style={{ marginLeft: "5px" }} />{" "}
          </span>
        </p>
        {account == "" ? (
          <button className="button" onClick={initConnection}>
            {" "}
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
      <div className="main">
        {nfts.list.map((nft, index) => {
          return (
            <div key={index} className="card">
              <img src={require (`./assets/images/${nft.id}.${nft.type}`)} className="nftImage" /> 
              <p className="nftText"> {nft.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
