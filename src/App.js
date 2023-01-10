import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import SimpleAuction from "./artifacts/contracts/Rent.sol/SimpleAuction.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  const address = "0x1d2085e6533d86E87D42513150E2378FaB957e18";
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [index, setIndex] = useState();
  const [index1, setIndex1] = useState();
  const [index2, setIndex2] = useState();
  const [paise, setPaise] = useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, SimpleAuction.abi, signer));
  };
  async function rent() {
    if (contract) {
      try {
        await contract.rent(index);
      } catch (e) {
        if (e.message.search("you are owner") != -1)
          alert("Owner cannot rent ");
        else if (e.message.search("Already booked") != -1)
          alert("Already booked");
        else {
          alert("Invalid number");
        }
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function turnIn() {
    if (contract) {
      try {
        await contract.turnIn(index1, { value: paise });
      } catch (e) {
        if (e.message.search("you are owner") != -1) alert("you are owner");
        else if (
          e.message.search(
            "cannot return someones else car Or Not yet Owned"
          ) != -1
        )
          alert("cannot return someones else car Or Not yet Owned");
        else if (e.message.search("not paid required amount") != -1) {
          const data = e.data;
          const txHash = Object.keys(data)[0];
          const reason = data[txHash].reason;
          console.log(reason);
        } else alert("Invalid Index");
      }
    } else {
      alert("Connect to wallet First");
    }
  }
  async function amount() {
    if (contract) {
      try {
        alert(await contract.amountToPay(index2));
      } catch (e) {
        if (
          e.message.search(
            "cannot return someones else car Or Not yet Owned"
          ) != -1
        )
          alert("cannot return someones else car Or Not yet Owned");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function cars() {
    if (contract) {
      try {
        const car = await contract.cars(index);
        alert("Owner is:" + car.add);
      } catch (e) {
        alert("Invalid index");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  const style3 = {
    marginLeft: "400px",
    marginRight: "100px",
  };
  const style4 = {
    marginLeft: "200px",
    marginRight: "100px",
  };
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>Car Bazar</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
      <Row sm={1} md={2} className="g-4">
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>RENT CAR</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Index number"
                />
                <br></br>
                <br></br>
                <Button onClick={rent}>Rent</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>RETURN CAR</Card.Title>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setPaise(e.target.value)}
                  placeholder="Amount"
                />
                <br></br>
                <br></br>
                <input
                  onChange={(e) => setIndex1(e.target.value)}
                  placeholder="Index number"
                />
                <br></br>
                <br></br>
                <Button onClick={turnIn}>Return</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>HOW MUCH?</Card.Title>

              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setIndex2(e.target.value)}
                  placeholder="Index number"
                />
                <br></br>
                <br></br>
                <Button onClick={amount}>AmountToPay</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>CHECK CAR</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Index number"
                />
                <br></br>
                <br></br>
                <Button onClick={cars}>Cars</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br></br>
      {/* <button onClick={rent}>Rent</button>
      <input
        onChange={(e) => setIndex(e.target.value)}
        placeholder="Index number"
      />
      <br></br>
      <br></br>
      <button onClick={turnIn}>Return</button>
      <input
        onChange={(e) => setIndex1(e.target.value)}
        placeholder="Index number"
      />
      <input onChange={(e) => setPaise(e.target.value)} placeholder="Amount" />
      <br></br>
      <br></br>
      <button onClick={amount}>AmountToPay</button>
      <input
        onChange={(e) => setIndex2(e.target.value)}
        placeholder="Index number"
      />
      <br></br>
      <br></br>
      <button onClick={cars}>Cars</button>
      <input
        onChange={(e) => setIndex(e.target.value)}
        placeholder="Index number"
      /> */}
    </div>
  );
}

export default App;
