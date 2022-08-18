#!/bin/bash

C_YELLOW='\033[1;33m'
C_BLUE='\033[0;34m'
C_RESET='\033[0m'

# subinfoln echos in blue color
function infoln() {
  echo -e "${C_YELLOW}${1}${C_RESET}"
}

function subinfoln() {
  echo -e "${C_BLUE}${1}${C_RESET}"
}

# add PATH to ensure we are picking up the correct binaries
export PATH=${HOME}/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

CHANNEL_NAME="mychannel"


# create channel
infoln "Generating channel create transaction '${CHANNEL_NAME}.tx'"
set -x
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/${CHANNEL_NAME}.tx -channelID $CHANNEL_NAME
{ set +x; } 2>/dev/null

export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="CoupangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/coupang.example.com/users/Admin@coupang.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
set -x
peer channel create -o localhost:7050 -c $CHANNEL_NAME --ordererTLSHostnameOverride orderer.example.com -f ./channel-artifacts/${CHANNEL_NAME}.tx --outputBlock ./channel-artifacts/${CHANNEL_NAME}.block --tls --cafile $ORDERER_CA >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


# join channel (peer0.coupang.com)
infoln "Joining coupang peer to the channel..."
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="CoupangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/coupang.example.com/users/Admin@coupang.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

set -x
peer channel join -b ./channel-artifacts/${CHANNEL_NAME}.block >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

# join channel (peer0.auction.com)
infoln "Joining auction peer to the channel..."
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="AuctionMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/auction.example.com/peers/peer0.auction.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/auction.example.com/users/Admin@auction.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

set -x
peer channel join -b ./channel-artifacts/${CHANNEL_NAME}.block >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

# join channel (peer0.bunjang.com)
infoln "Joining bunjang peer to the channel..."
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="BunjangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bunjang.example.com/peers/peer0.bunjang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bunjang.example.com/users/Admin@bunjang.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

set -x
peer channel join -b ./channel-artifacts/${CHANNEL_NAME}.block >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

# join channel (peer0.daangn.com)
infoln "Joining daangn peer to the channel..."
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="DaangnMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/daangn.example.com/peers/peer0.daangn.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/daangn.example.com/users/Admin@daangn.example.com/msp
export CORE_PEER_ADDRESS=localhost:13051

set -x
peer channel join -b ./channel-artifacts/${CHANNEL_NAME}.block >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

# join channel (peer0.kream.com)
infoln "Joining kream peer to the channel..."
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="KreamMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/kream.example.com/peers/peer0.kream.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/kream.example.com/users/Admin@kream.example.com/msp
export CORE_PEER_ADDRESS=localhost:15051

set -x
peer channel join -b ./channel-artifacts/${CHANNEL_NAME}.block >&log.txt
{ set +x; } 2>/dev/null
cat log.txt