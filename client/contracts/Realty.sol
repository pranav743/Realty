// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Realty is ERC721URIStorage {
    
    uint256 public tokenIdCounter = 1;

    mapping(uint256 => string) public tokenURIs; //mapping propertyid to tokenuri
    mapping(uint256 => bool) public isListed;    // propertyid to true/false
    mapping(address => uint256[]) public ownedProperties; // address to property.id 
    mapping(uint=>address[]) public allowners; // past owners of the address
    mapping(uint256=>bool) public isMinted;
    
    uint256[] public isListedArray;
    uint256[] public AllProperties;
    
    constructor() ERC721("REALTY","RLT") {}

    function mintNFT(
        string memory tokenURI,
        uint256 propertyID
        ) public returns (uint256) {

        require(!isMinted[propertyID],"PROPERTY ALREADY MINTED");
        
        tokenIdCounter = tokenIdCounter + 1;
        _safeMint(msg.sender, propertyID);
        _setTokenURI(propertyID,tokenURI);
       
        tokenURIs[propertyID]=tokenURI;
        isMinted[propertyID]=true;
        ownedProperties[msg.sender].push(propertyID);
        
        allowners[propertyID].push(msg.sender);

        AllProperties.push(propertyID);

        return propertyID;
    }


    function List_Property(uint256 propertyID) external {
        require(ownerOf(propertyID) == msg.sender, "Not the owner");
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


    function allPropertiesOwnedBy(address _owner) public view returns (string[] memory) {
        uint256[] memory properties = ownedProperties[_owner];
        string[] memory ownedTokenURIs = new string[](properties.length);
        for (uint256 i = 0; i < properties.length; i++) {
            ownedTokenURIs[i] = tokenURIs[properties[i]];
        }
        return ownedTokenURIs;
    }
    
        function buyProperty(uint256 propertyID, uint256 price) external payable {
            
            require(isListed[propertyID], "Properties Not Listed");
            require(msg.value >= price, "Insufficient funds");
            require(ownerOf(propertyID) != msg.sender, "Owner cannot buy their own property");

            address seller = ownerOf(propertyID);
            
            _transfer(seller, msg.sender, propertyID);

            payable(seller).transfer(price);

            ownedProperties[msg.sender].push(propertyID);
                             
            allowners[propertyID].push(msg.sender);

            isListed[propertyID]=false; 
            
            removeProperty(seller,propertyID);

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
