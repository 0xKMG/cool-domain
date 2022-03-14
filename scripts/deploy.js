const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("day");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    
      let txn = await domainContract.register("good",  {value: hre.ethers.utils.parseEther('0.3')});
      await txn.wait();
    console.log("Minted domain good.day");
  
    txn = await domainContract.setRecord("good", "I'm having a good day");
    await txn.wait();
    console.log("Set record for good.day");
  
    const address = await domainContract.getAddress("good");
  console.log("Owner of domain good:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();