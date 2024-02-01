/* global chrome*/
import React, { useEffect, useRef, useState } from 'react';
import { Box, InputGroup, Input, Button, InputRightElement, Textarea, Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { Icon, Skeleton } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import AIImage from '../../Assets/AI.jpg';
import USERIMAGE from '../../Assets/USER.jpg';
import { DNA, Hourglass } from 'react-loader-spinner';
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
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

const WebChat = ({ messages, setMessages }) => {

  const msgEnd = useRef(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [memoryStore, setMemoryStore] = useState(false);
  const navigate = useNavigate();

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
      setMemoryStore(vectorStore);
      console.log('Memory Store Created');

    } catch (error) {
      console.log(error);
      navigate(`/error/try-again/chat-website-conversation`);
    }
  }

  const handleScrape = () => {

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTabUrl = tabs[0].url;
      const scrapedCode = await fetchData(activeTabUrl);
      await createMemoryVectoreStore(scrapedCode);
      setPageLoading(false);
    });

    async function fetchData(url) {
      try {
        // Creating an instance of CheerioWebBaseLoader
        const loader = new CheerioWebBaseLoader(url, {
          selector:
            "[class^=content], [class*= content], [class$=content] div, [class^=content], [class*= content], [class$=content] article, [class^=content], [class*= content], [class$=content] p",
        });

        // Loading the document asynchronously
        const docs = await loader.load();

        // Replace multiple white spaces with a single space
        const cleanedContent = docs[0]?.pageContent.replace(/\s+/g, " ").trim();

        return cleanedContent;
      } catch (error) {
        navigate(`/error/try-again/chat-website-conversation`);
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
    const ans = await memoryStore.similaritySearch(text, 1);
    console.log(ans);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: ans[0].pageContent, isBot: true }
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
