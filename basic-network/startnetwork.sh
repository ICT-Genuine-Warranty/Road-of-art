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



# Tear down running network.
infoln "Tear down running network"
./networkdown.sh

# add PATH to ensure we are picking up the correct binaries
export PATH=${HOME}/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

# cleen up the MSP directory
if [ -d "organizations/peerOrganizations" ]; then
    rm -Rf organizations/peerOrganizations && rm -Rf organizations/ordererOrganizations
fi

# Generate certificates using Fabric CA
# Excute CA containers
infoln "------------- Generating certificates using Fabric CA"
COMPOSE_FILE_CA=docker/docker-compose-ca.yaml
IMAGE_TAG=latest docker-compose -f $COMPOSE_FILE_CA up -d 2>&1
sleep 2

# Create crypto material using cryptogen

infoln "Generating certificates using cryptogen tool"

subinfoln "Creating Coupang Identities"

set -x
cryptogen generate --config=./config/crypto-config-coupang.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null

subinfoln "Creating Auction Identities"

set -x
cryptogen generate --config=./config/crypto-config-auction.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null

subinfoln "Creating Bunjang Identities"

set -x
cryptogen generate --config=./config/crypto-config-bunjang.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null

subinfoln "Creating Daangn Identities"

set -x
cryptogen generate --config=./config/crypto-config-daangn.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null

subinfoln "Creating Kream Identities"

set -x
cryptogen generate --config=./config/crypto-config-kream.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null

subinfoln "Creating Orderer Org Identities"

set -x
cryptogen generate --config=./config/crypto-config-orderer.yaml --output="organizations"
res=$?
{ set +x; } 2>/dev/null


# Generate orderer system channel genesis block.
infoln "------------- Generating Orderer Genesis block"
set -x
configtxgen -profile TwoOrgsOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
{ set +x; } 2>/dev/null

# Bring up the peer and orderer nodes using docker compose.
infoln "------------- Bring up the peer and orderer nodes using docker compose"

COMPOSE_FILES_ORDERER=docker/docker-compose-orderer.yaml
COMPOSE_FILES_PEER=docker/docker-compose-peer.yaml
COMPOSE_FILES_COUCH=docker/docker-compose-couch.yaml

IMAGE_TAG=latest docker-compose -f $COMPOSE_FILES_ORDERER -f $COMPOSE_FILES_PEER -f $COMPOSE_FILES_COUCH up -d 2>&1

docker ps -a