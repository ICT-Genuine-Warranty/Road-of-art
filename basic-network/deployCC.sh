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

# Chaincode config variable

# CHANNEL_NAME="mychannel"
CC_NAME="basic"
CC_SRC_PATH="../chaincode/asset-transfer-basic"
CC_RUNTIME_LANGUAGE="golang"
CC_VERSION="1"
CHANNEL_NAME="roadofart"


## package the chaincode
infoln "Packaging chaincode"
set -x
peer lifecycle chaincode package ${CC_NAME}.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label ${CC_NAME}_${CC_VERSION} >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## Install chaincode on peer0.coupang
infoln "Installing chaincode on peer0.coupang..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="CoupangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/coupang.example.com/users/Admin@coupang.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## Install chaincode on peer0.auction
infoln "Installing chaincode on peer0.auction..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="AuctionMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/auction.example.com/peers/peer0.auction.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/auction.example.com/users/Admin@auction.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## Install chaincode on peer0.bunjang
infoln "Installing chaincode on peer0.bunjang..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="BunjangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bunjang.example.com/peers/peer0.bunjang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bunjang.example.com/users/Admin@bunjang.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## Install chaincode on peer0.daangn
infoln "Installing chaincode on peer0.daangn..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="DaangnMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/daangn.example.com/peers/peer0.daangn.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/daangn.example.com/users/Admin@daangn.example.com/msp
export CORE_PEER_ADDRESS=localhost:13051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## Install chaincode on peer0.kream
infoln "Installing chaincode on peer0.kream..."

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="KreamMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/kream.example.com/peers/peer0.kream.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/kream.example.com/users/Admin@kream.example.com/msp
export CORE_PEER_ADDRESS=localhost:15051

set -x
peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

set -x
peer lifecycle chaincode queryinstalled >&log.txt  
{ set +x; } 2>/dev/null
PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)



## approve the definition for coupang
infoln "approve the definition on peer0.coupang..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="CoupangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/coupang.example.com/users/Admin@coupang.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt


## approve the definition for auction
infoln "approve the definition on peer0.auction..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="AuctionMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/auction.example.com/peers/peer0.auction.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/auction.example.com/users/Admin@auction.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## approve the definition for bunjang
infoln "approve the definition on peer0.bunjang..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="BunjangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bunjang.example.com/peers/peer0.bunjang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bunjang.example.com/users/Admin@bunjang.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## approve the definition for daangn
infoln "approve the definition on peer0.daangn..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="DaangnMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/daangn.example.com/peers/peer0.daangn.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/daangn.example.com/users/Admin@daangn.example.com/msp
export CORE_PEER_ADDRESS=localhost:13051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## approve the definition for kream
infoln "approve the definition on peer0.kream..."

ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="KreamMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/kream.example.com/peers/peer0.kream.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/kream.example.com/users/Admin@kream.example.com/msp
export CORE_PEER_ADDRESS=localhost:15051

set -x
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

## check commitreadiness
peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --sequence 1 --tls --cafile $ORDERER_CA --output json


## commit the chaincode definition
infoln "commit the chaincode definition"

PEER_CONN_PARMS="--peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/auction.example.com/peers/peer0.auction.example.com/tls/ca.crt  --peerAddresses localhost:11051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/bunjang.example.com/peers/peer0.bunjang.example.com/tls/ca.crt  --peerAddresses localhost:13051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/daangn.example.com/peers/peer0.daangn.example.com/tls/ca.crt  --peerAddresses localhost:15051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/kream.example.com/peers/peer0.kream.example.com/tls/ca.crt"

set -x
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} $PEER_CONN_PARMS --version ${CC_VERSION} --sequence 1 >&log.txt
{ set +x; } 2>/dev/null
cat log.txt

peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME} --cafile $ORDERER_CA

## TEST1 : Invoking the chaincode
infoln "TEST1 : Invoking the chaincode"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"InitLedger","Args":[]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3


## TEST2 : Query the chaincode

infoln "TEST2 : Query the chaincode"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["GetAllTradeInfos"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

## TEST3 : Create Asset
infoln "TEST3 : transfer item1"
set -x
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n ${CC_NAME} $PEER_CONN_PARMS -c '{"function":"TransferTradeInfo","Args":["trade3","item1","3","15000","2023-01-01","4","2","4","testsell","testbuy"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

## TEST4 : Read Asset7
infoln "TEST4 : Read item1"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"GetInfoByItem","Args":["item1"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3

## TEST5 : IsExists Asset7
infoln "TEST5 : Get History of item1"
set -x
peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"GetHistory","Args":["item1"]}' >&log.txt
{ set +x; } 2>/dev/null
cat log.txt
sleep 3
