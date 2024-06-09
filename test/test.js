const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("GLDToken", function () {
  async function deployTokenFixture() {
    const initialSupply = 1000000;
    const [owner, otherAccount] = await ethers.getSigners();

    const gld_token = await ethers.getContractFactory("GLDToken");
    const GLDToken = await gld_token.deploy(initialSupply);

    return { GLDToken, initialSupply, owner, otherAccount };
  }

  describe("GLDToken", function () {
    it("Should set the right name", async function () {
      const { GLDToken, initialSupply } = await loadFixture(deployTokenFixture);
      expect(await GLDToken.name()).to.equal("Gold");
    });

    it("Should set the right symbol", async function () {
      const { GLDToken, initialSupply } = await loadFixture(deployTokenFixture);
      expect(await GLDToken.symbol()).to.equal("GLD");
    });

    it("Should set the right total supply", async function () {
      const { GLDToken, initialSupply } = await loadFixture(deployTokenFixture);
      expect(await GLDToken.totalSupply()).to.equal(initialSupply);
    });

    it("Should set the right initial owner balance", async function () {
      const { GLDToken, initialSupply, owner } = await loadFixture(
        deployTokenFixture
      );
      expect(await GLDToken.balanceOf(owner)).to.equal(initialSupply);
    });

    it("Should set the right initial owner balance after transfer", async function () {
      const { GLDToken, initialSupply, owner, otherAccount } =
        await loadFixture(deployTokenFixture);
      const transfer_amount = 10000;
      await GLDToken.transfer(otherAccount, transfer_amount);
      expect(await GLDToken.balanceOf(owner)).to.equal(
        initialSupply - transfer_amount
      );
    });
  });
});
