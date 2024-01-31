// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;


contract Realty{
    
    uint256 public tokenIdCounter = 1;

    mapping(uint256 => string) public tokenURIs;             //mapping propertyid to tokenuri
    mapping(uint256 => bool) public isListed;                // propertyid to true/false
    mapping(address => uint256[]) public ownedProperties;   // address to property.id 
    mapping(uint=>address[]) public allowners;             // past owners of the address
    mapping(uint256=>bool) public isMinted;                //is minted
    mapping(address=>uint256) public safemint;            //safemin (address to proid) 
    mapping(uint256=>string) public setTokenURI;          // propid to uri
    mapping(uint256=>address) public ownerof;            

    uint256[] public isListedArray;
    uint256[] public AllProperties;
    

    function mintNFT(
        string memory tokenURI,
        uint256 propertyID
        ) public returns (uint256) {

        require(!isMinted[propertyID],"PROPERTY ALREADY MINTED");
        
        tokenIdCounter = tokenIdCounter + 1;
        safemint[msg.sender] = propertyID;
        setTokenURI[propertyID]=tokenURI;
        tokenURIs[propertyID]=tokenURI;
        isMinted[propertyID]=true;
        ownedProperties[msg.sender].push(propertyID);
        ownerof[propertyID]=msg.sender;
        allowners[propertyID].push(msg.sender);
        AllProperties.push(propertyID);

        return propertyID;
    }

    
    function List_Property(uint256 propertyID) external {

        require(ownerof[propertyID] == msg.sender, "Not the owner");
        isListedArray.push(propertyID);
        isListed[propertyID]=true;
    }
    
    function allProperties() public view returns (string[] memory) {
            
            uint256 TotalCount = AllProperties.length;
            string[] memory TotalTokenURIs = new string[](TotalCount);

            for (uint256 i = 0; i < TotalCount; i++) { 
                
                TotalTokenURIs[i] = tokenURIs[AllProperties[i]];
            }

            return TotalTokenURIs;
    }
    


    function allListedProperties() public view returns (string[] memory) {
            
            uint256 listedCount = isListedArray.length;

            string[] memory listedTokenURIs = new string[](listedCount);

            for (uint256 i = 0; i < listedCount; i++) { 
                
                listedTokenURIs[i] = tokenURIs[isListedArray[i]];
            }

            return listedTokenURIs;
    }

    function mintedPropertiesByOwner(address _owner) public view returns (string[] memory) {
        uint256[] memory properties = ownedProperties[_owner];
        string[] memory mintedTokenURIs = new string[](properties.length);
        uint256 mintedIndex = 0;

        for (uint256 i = 0; i < properties.length; i++) {
            if (isMinted[properties[i]] && !isListed[properties[i]]) {
                mintedTokenURIs[mintedIndex] = tokenURIs[properties[i]];
                mintedIndex++;
            }
        }

        return mintedTokenURIs;
    }   

    function allPropertiesOwnedBy(address _owner) public view returns (string[] memory) {
        uint256[] memory properties = ownedProperties[_owner];
        string[] memory ownedTokenURIs = new string[](properties.length);
        for (uint256 i = 0; i < properties.length; i++) {
            ownedTokenURIs[i] = tokenURIs[properties[i]];
        }
        return ownedTokenURIs;
    }
    
    function buyProperty(uint256 propertyID, uint256 price) external payable {
            require(isListed[propertyID], "Property not listed");
            require(msg.value >= price, "Insufficient funds");
            require(ownerof[propertyID] != msg.sender, "Owner cannot buy their own property");

            address seller = ownerof[propertyID];

            safemint[msg.sender] = propertyID; // Update safeMint mapping for new owner
            delete safemint[seller]; // Remove property ID from old owner

            payable(seller).transfer(price); // Transfer the price to the seller

            // Transfer any excess funds back to the buyer
            payable(msg.sender).transfer(msg.value - price);

            // Transfer ownership of the property
            ownerof[propertyID] = msg.sender;

            // Add the property to the list of owned properties for the new owner
            ownedProperties[msg.sender].push(propertyID);

            // Add the new owner to the list of all owners of the property
            allowners[propertyID].push(msg.sender);

            // Mark the property as no longer listed
            isListed[propertyID] = false;

            // Remove the property from the seller's list of owned properties
            removeProperty(seller, propertyID);
        }

        function removeProperty(address owner, uint256 propertyId) public {
          uint256[] storage properties = ownedProperties[owner];
          for (uint256 i = 0; i < properties.length; i++) {
              if (properties[i] == propertyId) {
                 properties[i] = properties[properties.length - 1];
                 properties.pop();
                 break;
            }
        }
    }


} 
