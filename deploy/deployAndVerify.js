const { ethers } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function main() {
  const myContractFactory = await ethers.getContractFactory("GLDToken");
  console.log("Deploying contract...");
  const initialSupply = 1000000;
  const myContract = await myContractFactory.deploy(initialSupply);

  // Verification not required on hardhat network and hardhat node network, You might have to use other enviroments like Ganache
  if (network.config.chainId != 31337) {
    console.log("Waiting for block confirmations...");
    await myContract.deploymentTransaction().wait(6); // Wait 6 block confirmation before verification starts
    await verify(myContract.target, [initialSupply]); //Pass the constructor argument if any.
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
