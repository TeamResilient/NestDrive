const { expect } = require("chai");
const { ethers } = require("hardhat");

let contract;


describe("NestCoin", function(){
    it("should deploy the NestDrive contract to the testnet", async function(){
        //Get Contract from Contract Factory
        const NestdriveContract = await ethers.getContractFactory("NestDrive");

        // here we deploy the contract
        const deployedNestDriveContract = await NestdriveContract.deploy();
    
        // Wait for it to finish deploying
        contract = await deployedNestDriveContract.deployed();
    
        // print the address of the deployed contract
        console.log(
            "\n 🏵 NESTDRIVE Contract Address:",
            deployedNestDriveContract.address
        );

      });
});




describe("Upload Files", function(){
    it("should be able to upload a public file to the contract", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        //Upload File 
        uploadFile = await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        // Expect the function to go through
        const txResult = await uploadFile.wait();
        expect(txResult.status).to.equal(1);

    });

    

     
    it("should  be able to upload a private file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
         //Upload File 
        uploadFile = await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            false
        );
        // Expect the function to go through
        const txResult = await uploadFile.wait();
        expect(txResult.status).to.equal(1);
        
    })

    it("should not be able to upload a file to contract since length of hash is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        // Expect the function not to go through 
        await expect(contract.connect(owner).uploadFile(
            "",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        )).to.be.reverted;
        
    })
    it("should not be able to upload a file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        )).to.be.reverted;
        
    })

    it("should not be able to upload a file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        )).to.be.reverted;
        
    })

    it("should not be able to upload a file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        )).to.be.reverted;
        
    })

    it("should not be able to upload a file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "",
            true
        )).to.be.reverted;
        
    })

    it("should not be able to upload a file to contract since length of type is 0", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "",
            true
        )).to.be.reverted;
        
    })

    it("should not be able to upload a file if contract is paused", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "should not be able to upload a file to contract since length of type is 0",
            true
        )).to.be.reverted;
    })

    it("should not be able to upload a file if account is blacklisted", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).addToBlackList(secondAccount.address);
        await expect(contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "should not be able to upload a file to contract since length of type is 0",
            true
        )).to.be.revertedWith("Address is currently Blacklisted..");
    })
})


describe("Fetch Public Files", function(){
    it("Should be able to fetch public files", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).removeFromBlackList(secondAccount.address);
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        const fetchPublicFiles = await contract.connect(secondAccount).fetchPublicFiles();
        expect(fetchPublicFiles.length).to.be.equal(5);
    });
    it("Can't get public files when contract is Paused", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(owner).pause();
        await expect(contract.connect(secondAccount).fetchPublicFiles()).to.be.reverted;
    });
    it("Blacklisted address should not get public files", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(owner).addToBlackList(secondAccount.address);
        await expect(contract.connect(secondAccount).fetchPublicFiles()).to.be.revertedWith("Address is currently Blacklisted..");
    });
})

describe("Fetch User Files", function(){
    it("Should be able to fetch public files", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).removeFromBlackList(secondAccount.address);
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        const fetchUserFiles = await contract.connect(secondAccount).fetchUserFiles();
        expect(fetchUserFiles.length).to.be.equal(4);
    });
    it("Can't get public files when contract is Paused", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(owner).pause();
        await expect(contract.connect(secondAccount).fetchUserFiles()).to.be.reverted;
    });
    it("Blacklisted address should not get public files", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(secondAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(thirdAccount).uploadFile(
            "QmZxQhLnHgHj3UZjnsZTLQC3Q7UCJAU7iN7htU6q9NNwnb",
            "500kb",
            "image/jpeg",
            "My Picture",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            true
        );
        await contract.connect(owner).addToBlackList(secondAccount.address);
        await expect(contract.connect(secondAccount).fetchUserFiles()).to.be.revertedWith("Address is currently Blacklisted..");
    });
})

describe("Make File Public", function(){
    it("Should be able to make file public", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).removeFromBlackList(secondAccount.address);
        const fetchUserFiles = await contract.connect(owner).makeFilePublic(2);
        const txResult = await fetchUserFiles.wait();
        expect(txResult.status).to.be.equal(1);
    });
    it("Only File Owner should be able to Make file Public", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(secondAccount).makeFilePublic(2)).to.be.revertedWith("you can only manipulate your own file");
    });
    it("Can't make file public when contract is paused", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(owner).makeFilePublic(2)).to.be.reverted;
    });
    it("Blacklisted address should not be able to make files public", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).addToBlackList(secondAccount.address);
        await expect(contract.connect(secondAccount).makeFilePublic(2)).to.be.revertedWith("Address is currently Blacklisted..");
    });
})

describe("Make File Private", function(){
    it("Should be able to make file private", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).removeFromBlackList(secondAccount.address);
        const fetchUserFiles = await contract.connect(owner).makeFilePrivate(1);
        const txResult = await fetchUserFiles.wait();
        expect(txResult.status).to.be.equal(1);
    });
    it("Only File Owner should be able to Make file private", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await expect(contract.connect(secondAccount).makeFilePrivate(1)).to.be.revertedWith("you can only manipulate your own file");
    });
    it("Can't make file private when contract is paused", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(owner).makeFilePrivate(1)).to.be.reverted;
    });
    it("Blacklisted address should not be able to make files private", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).addToBlackList(secondAccount.address);
        await expect(contract.connect(secondAccount).makeFilePrivate(1)).to.be.revertedWith("Address is currently Blacklisted..");
    });
})

describe("Pause Contract", function(){
    it("Should be able to pause contract", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const pause = await contract.connect(owner).pause();
        const paused = await pause.wait();
        expect(paused.status).to.be.equal(1);
    })

    it("Should not be able to pause contract if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await expect(contract.connect(secondAccount).pause()).to.be.revertedWith("Only Moderators Have Access!");
    })

    
})

describe("UnPause Contract", function(){
    it("Should be able to pause contract", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        const pause = await contract.connect(owner).unpause();
        
        const paused = await pause.wait();
        expect(paused.status).to.be.equal(1);
    })

    it("Should not be able to pause contract if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();

        await contract.connect(owner).pause();
        await expect(contract.connect(secondAccount).unpause()).to.be.revertedWith("Only Moderators Have Access!");
    })
})


describe("BlackList Address", function(){
    it("Should be able to blacklist address if moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        const blacklist = await contract.connect(owner).addToBlackList(secondAccount.address);
        const blacklisted = await blacklist.wait();
        expect(blacklisted.status).to.be.equal(1);
    })

    it("Should not be able to blacklist if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await expect(contract.connect(thirdAccount).addToBlackList(fourthAccount.address)).to.be.revertedWith("Only Moderators Have Access!");
    })

    
})

describe("Remove Address from Blacklist. Get Blacklist", function(){
    it("Should be able to remove address if moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const blacklist = await contract.connect(owner).removeFromBlackList(secondAccount.address);
        const blacklisted = await blacklist.wait();
        expect(blacklisted.status).to.be.equal(1);
    })

    it("Should not be able to remove address if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).addToBlackList(fourthAccount.address)
        await expect(contract.connect(thirdAccount).removeFromBlackList(fourthAccount.address)).to.be.revertedWith("Only Moderators Have Access!");
    })

    it("Should be able to get blacklist Array", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const blacklistArray = await contract.connect(owner).blackListArray();
        expect(blacklistArray.length).to.be.equal(2);
    })

    
})









describe("Moderator Assigning and Removal, Check Moderator", function(){
    it("Should be able to assign moderator if moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const blacklist = await contract.connect(owner).assignMod(secondAccount.address);
        const blacklisted = await blacklist.wait();
        expect(blacklisted.status).to.be.equal(1);
    })

    it("Should not be able to assign moderator if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await expect(contract.connect(thirdAccount).assignMod(fourthAccount.address)).to.be.revertedWith("Only Moderators Have Access!");
    })

    it("Should not be able to assign moderator if contract is paused", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(thirdAccount).assignMod(fourthAccount.address)).to.be.reverted;
    })



    it("Should be able to remove moderator if moderator", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        const blacklist = await contract.connect(owner).removeMod(secondAccount.address);
        const blacklisted = await blacklist.wait();
        expect(blacklisted.status).to.be.equal(1);
    })

    it("Should not be able to remove moderator if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await expect(contract.connect(thirdAccount).removeMod(fourthAccount.address)).to.be.revertedWith("Only Moderators Have Access!");
    })

    it("Should not be able to remove moderator if contract is paused", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(thirdAccount).removeMod(fourthAccount.address)).to.be.reverted;
    })

    it("Should be able to check for  moderator ", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        await contract.connect(owner).assignMod(secondAccount.address);
        const checkMod = await contract.connect(owner).checkMod(secondAccount.address);
        expect(checkMod).to.be.equal(true);
    })

    it("Should not be able to check for  moderator if contract is paused  ", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).pause();
        await expect(contract.connect(owner).checkMod(fourthAccount.address)).to.be.reverted;
    })

})

describe("Report and Clear Reported Files", function(){
    it("Should be able report a file", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        await contract.connect(owner).unpause();
        const report = await contract.connect(owner).report(4);
        const reported = await report.wait();
        expect(reported.status).to.be.equal(1);
    })

    it("Should be able clear reported files from the system", async function(){
        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const clearreport = await contract.connect(owner).clearReportedFiles(4);
        const clearreported = await clearreport.wait();
        expect(clearreported.status).to.be.equal(1);
    })


    it("Should not be able to clear reported files if address is not a moderator", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        await contract.connect(owner).report(5);
        await expect(contract.connect(thirdAccount).clearReportedFiles(4)).to.be.revertedWith("Only Moderators Have Access!")
    })

    it("Should be able to get reportedList", async function(){
        const [ owner, secondAccount, thirdAccount, fourthAccount] = await ethers.getSigners();
        const reportedFiles = await contract.connect(owner).reportedListArray();
        expect(reportedFiles.length).to.be.equal(1);
    })



    

})

describe("Admin Taking Action on User", function(){
    it("Should be able make a users post private", async function(){

        const [ owner, secondAccount, thirdAccount] = await ethers.getSigners();
        const makeprivate = await contract.connect(owner).makeReportedPrivate(6);
        const makeprivated = await makeprivate.wait();
        expect(makeprivated.status).to.be.equal(1);
    })   
    
    it("Should not be able make a users post private if not admin", async function(){

        const [ owner, secondAccount, thirdAccount, fifthAccount] = await ethers.getSigners();
        await expect(contract.connect(fifthAccount).makeReportedPrivate(6)).to.be.reverted;
    })
        
    
})



