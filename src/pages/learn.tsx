/* eslint-disable no-console */
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type Message from '@/components/Agent'
import Agent from '@/components/Agent';
import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Window from '@/components/Messages';
import Seo from '@/components/Seo';

import { RootState } from '@/store/store';

export default function Learn() {
  const router = useRouter();
  const { subject, proficiency, topic } = useSelector((state: RootState) => state.subject);
  const [, setAgent] = React.useState<Agent | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    if (!subject || !proficiency) {
      router.push('/');
    }
  }, [subject, proficiency, router]);

  const callAgent = () => {
    const agent = new Agent(subject, proficiency, topic, handleAddMessage);
    setAgent(agent);
    agent.run();
  }

  const handleAddMessage = (message : Message) => {
    console.log(messages);
    setMessages((prev) => [...prev, message]);
  };

  return (
    <Layout>
    {/* <Seo templateTitle='Home' /> */}
    <Seo />

    <main>
      <section className='bg-white'>
        <div className="bg-gray-200 text-black px-4 py-2 flex justify-between items-center">
          <div className='ml-7'>
            <span className="mr-2 font-bold font-mon">Subject:</span>
            <span className='block'>{subject}</span>
          </div>
          <div>
            <p className="mr-2 font-bold font-mon">Proficiency:</p>
            <p className='block'>{proficiency}</p>
          </div>
          <div className='mr-7'>
            <p className="mr-2 font-bold font-mon">Topic:</p>
            <p className='block'>{topic}</p>
          </div>
        </div>
        <div className='layout relative flex flex-col items-center justify-center py-12 text-center'>
        <p>
          <Window messages={messages} />
        </p>
        </div>
        <div className='flex items-center justify-center bg-gray-200 px-4 py-2'>
          <Button onClick={callAgent}>Call Agent</Button>
        </div>
      </section>
    </main>
    </Layout>
  );
};


/* 

Implement:

[ ] Educational Snippet message type 
[ ] Test message type 
[ ] Text input message type 
[ ] System instructions for the user
[ ] 

Topics

Blockchain fundamentals:

Distributed ledger technology (DLT)
Consensus mechanisms (Proof of Work, Proof of Stake, etc.)
Tokenization concepts (tokens, ICOs, NFTs, etc.)
Blockchain types (public, private, consortium, etc.)
Smart contract platforms:

Ethereum (most popular)
Binance Smart Chain
Cardano
Solana
Polkadot
Avalanche
Other emerging platforms
Programming languages and tools:

Solidity (most popular for Ethereum)
Vyper (alternative for Ethereum)
Rust (for Solana and Polkadot)
Plutus (for Cardano)
Development frameworks (Truffle, Hardhat, etc.)
Integrated development environment (IDE) options (e.g., Remix)
Smart contract design patterns and best practices:

Contract structure and organization
Function visibility and access control
Reentrancy prevention
Error handling and exception management
Gas optimization
Upgradeability and modularity
Smart contract security:

Common vulnerabilities (reentrancy attacks, integer overflows, etc.)
Security audits and tools (e.g., Slither, Mythril, OpenZeppelin)
Secure coding practices
Formal verification
Testing and deployment:

Writing unit and integration tests
Local blockchain setup (e.g., Ganache)
Test networks (Ropsten, Rinkeby, Kovan, etc.)
Deployment to mainnet
Decentralized application (DApp) integration:

Front-end frameworks (React, Vue, Angular, etc.)
Web3.js, ethers.js, or other blockchain interaction libraries
Decentralized storage solutions (e.g., IPFS, Filecoin)
Decentralized identity (e.g., DID)
Standards and interoperability:

ERC20, ERC721, ERC1155 token standards
EIPs (Ethereum Improvement Proposals)
Cross-chain communication and bridges
DeFi (Decentralized Finance) concepts:

Decentralized exchanges (DEXes)
Lending platforms
Yield farming
Stablecoins
Oracles and data providers
Liquidity pools
Legal, regulatory, and compliance aspects:

Smart contract legal implications
Security and utility tokens
Data privacy regulations (e.g., GDPR)
Anti-money laundering (AML) and know your customer (KYC) aspects



*/