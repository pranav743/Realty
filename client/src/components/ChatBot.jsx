/* global chrome*/
import React, { useEffect, useRef, useState } from 'react';
import { Box, InputGroup, Input, Button, InputRightElement, Textarea, Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { Icon, Skeleton } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import AIImage from './AI.jpg';
import USERIMAGE from './USER.jpg';
import { DNA, Hourglass } from 'react-loader-spinner';
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { useNavigate } from 'react-router-dom';

function createArrayWithIds(n) {

  const resultArray = [];

  for (let i = 1; i <= n; i++) {
    resultArray.push({ id: i });
  }

  return resultArray;
}

const WebChat = () => {

  const msgEnd = useRef(null);
  const [messages, setMessages] = useState([
    {
      text: 'Hi ask me anything related to the website',
      isBot: true,
    },
  ]);

  const handleNewChat = () => {
    setMessages([
      {
        text: 'Hi, ask me anything related to the website',
        isBot: true,
      },
    ]);
  };
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [memoryStore, setMemoryStore] = useState(false);
  const [chain, setChain] = useState(false);
  const navigate = useNavigate();
  const model = new TogetherAI({
        modelName: "NousResearch/Nous-Hermes-Llama2-13b",
        apiKey: 'a8820b4b38ad46999e38b4c8d41f9e2c36bc6aeae0c5c623efa93960dbc2b85d',
        temperature: 0.1,
        maxTokens: 1024
    });
    

  const createMemoryVectoreStore = async (textData) => {
    try {
      console.log("TextData : ", textData);
      const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1200, chunkOverlap: 100 });
      const texts = await textSplitter.splitText(textData);
      console.log(texts);
      const embeddings = new HuggingFaceInferenceEmbeddings({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
      });
      const ids = createArrayWithIds(texts.length);
      const vectorStore = await MemoryVectorStore.fromTexts(
        texts,
        ids,
        embeddings
      );
      const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {returnSourceDocuments: false});
      setChain(chain)
      setMemoryStore(vectorStore);
      console.log('Memory Store Created');

    } catch (error) {
      console.log(error);
      navigate(`/`);
    }
  }

  const handleScrape = async () => {
    const scrapedCode = await fetchData();
      await createMemoryVectoreStore(scrapedCode);
      setPageLoading(false);
    
    async function fetchData() {
      try {
        const cleanedContent = `// Acts Laws

        Real Estate (Regulation and Development) Act, 2016 (RERA): RERA is a landmark legislation aimed at regulating the real estate sector and protecting the interests of homebuyers. It mandates the registration of real estate projects and real estate agents, provides transparency in transactions, establishes a regulatory authority in each state, and defines the rights and obligations of buyers and developers.
        
        The Transfer of Property Act, 1882: This act governs the transfer of property in India and provides rules for the transfer of immovable property such as sale, mortgage, lease, and gift.
        
        The Registration Act, 1908: The Registration Act mandates the registration of various documents related to the transfer of property, including sale deeds, leases, and mortgages. Registration provides legal validity and authenticity to such documents.
        
        The Indian Stamp Act, 1899: This act governs the payment of stamp duty on various documents, including those related to property transactions. Stamp duty rates vary from state to state and are levied on the market value of the property.
        
        The Land Acquisition Act, 2013: This act governs the acquisition of land by the government for public purposes. It lays down procedures for land acquisition, determination of compensation, and rehabilitation and resettlement of affected persons.
        
        // Setup MetaMask
        
        Install MetaMask Extension: Add the MetaMask extension to your browser (Chrome, Firefox, Brave, or Edge).
        
        Create a Wallet: Follow the prompts to create a new wallet, including setting a password and securely storing your seed phrases.
        
        Access Your Wallet: After setup, access your wallet through the MetaMask extension.
        
        Customize Your Wallet: Add tokens and adjust settings as needed.
        
        Use for Transactions: Connect MetaMask to decentralized applications (DApps) to perform transactions on the Ethereum blockchain.
        
        Secure Your Wallet: Keep your password and seed phrases safe, consider enabling additional security features, and never share your credentials
        
        // What is Blockchain
        
        Blockchain is a decentralized, distributed ledger technology that records transactions across a network of computers in a way that ensures the integrity and security of the data exchanged
        
        // What is Metamask
        
        MetaMask is a cryptocurrency wallet and a gateway to decentralized applications (DApps) that run on the Ethereum blockchain. It primarily functions as a browser extension, allowing users to interact with Ethereum-based DApps directly from their web browsers.
        
        // What is stamp duty
        
        Stamp duty is a type of tax levied on certain legal documents and transactions, typically involving the transfer of assets or property rights. The tax is imposed on the execution of documents, meaning that it is payable when legal documents are executed or signed. Stamp duty laws vary by jurisdiction, and the types of documents subject to stamp duty can differ accordingly`

        return cleanedContent;
      } catch (error) {
        navigate('/');
        console.error("Error:", error);
      }
    }

  };

  useEffect(() => {
    try {
      msgEnd.current.scrollIntoView();
    } catch (error) {
      console.log("Ignore this Error");
    }
  }, [messages]);

  const handleSend = async () => {
    
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);
    setLoading(true);
    const res = await chain.call({
        question: text ,
        chat_history: ''
    });
    console.log(res);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: res.text, isBot: true }
    ]);
    setLoading((x) => false);

  };

  useEffect(() => {
    handleScrape();
  }, []);

  if (pageLoading) {
    return (
      <Box height='80%' display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {/* <p style={{color: '#fff'}}>Please Wait...</p> */}
        <Hourglass
          visible={true}
          height="30"
          width="30"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </Box>
    );
  }

  return (
    <Box height='80%'>
      
      <Box
        bg='#121b21'
        marginBottom='1rem'
        marginTop='1rem'
        borderRadius='5px'
        border='0.7px solid #6fa6cb'
        padding='0.5rem'
        maxHeight='75%'
        overflowY='scroll'
        overflowX='hidden'
        height='90%'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '24px',
          },
        }}
      >
        <Button onClick={()=> {
        setPageLoading(true);
        setMemoryStore(false);
        handleScrape();
      }} 
      width={'100%'} height={'30px'} colorScheme='teal'>Add Current Website</Button>


        {messages.map((message, index) => {
          return (
            <Card
              direction='row'
              variant={message.isBot ? 'outline' : null}
              bg=''
              marginTop='1rem'
              height='fit-content'
              key={index}
              style={{ wordWrap: 'break-word' }}
              css={
                message.isBot ? {
                  background: '#406176',
                  boxShadow: '0 0 10px 0px #48abe0',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '0.5px solid rgba(255, 255, 255, 0.18)',
                } :
                  {
                    background: 'none'

                  }
              }
            >
              <Image
                objectFit='cover'
                width='30px'
                height='30px'
                margin='0.5rem'
                src={message.isBot ? AIImage : USERIMAGE}
                alt='Caffe Latte'
                borderRadius='8px'
                bg='red'
              />

              <CardBody p='0.5rem' style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                <Text
                  textAlign='left'
                  fontFamily='Poppins'
                  color={message.isBot ? 'white' : 'white'}
                  fontWeight='600'
                >
                  {message.text}
                </Text>
              </CardBody>
            </Card>
          );
        })}

        {loading && <Card
          direction='row'
          overflow='hidden'
          variant='outline'
          bg='lightblue'
          marginTop='1rem'
          height='fit-content'
          css={{
            background: '#406176',
            boxShadow: '0 0 20px 0px #48abe0',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }
          }
        >
          <Image
            objectFit='cover'
            width='30px'
            height='30px'
            margin='0.5rem'
            src={AIImage}
            alt='Caffe Latte'
            borderRadius='8px'
            bg='red'
          />

          <CardBody p='0.5rem' >
            <Text textAlign='left' fontFamily='Poppins' color={'black'} fontWeight='600'>
              <DNA
                visible={true}
                height="50"
                width="50"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </Text>
          </CardBody>
        </Card>}


        <div ref={msgEnd} />
      </Box>

      <Box width='100%' height='20%'>
        <InputGroup>
          <Textarea
            pr='3.5rem'
            type='text'
            placeholder='Enter Message'
            borderRadius='7px'
            bg='#121b21'
            color='white'
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}

            value={input}
            onChange={(e) => { setInput(e.target.value) }}
          />
          <InputRightElement width='2.5rem' marginRight='1rem' height='100%'>
            <Button h='1.75rem' size='sm' onClick={handleSend}>
              <Icon as={IoMdSend} color='black' />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default WebChat;
