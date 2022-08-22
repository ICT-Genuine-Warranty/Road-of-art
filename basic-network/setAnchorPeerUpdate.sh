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


infoln "Fetching channel config for channel $CHANNEL_NAME"

# add PATH to ensure we are picking up the correct binaries
export PATH=${HOME}/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

CHANNEL_NAME="roadofart"

export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export CORE_PEER_TLS_ENABLED=true

############################################################
######## set anchor peer for Coupang in the channel ########
############################################################

# Fetching the most recent configuration block for the channel
infoln "Fetching the most recent configuration block for the channel"
export CORE_PEER_LOCALMSPID="CoupangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/coupang.example.com/peers/peer0.coupang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/coupang.example.com/users/Admin@coupang.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

pushd channel-artifacts
set -x
peer channel fetch config config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null


# Decoding config block to JSON and isolating config to config.json
infoln "Decoding config block to JSON and isolating config to config.json"
set -x
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
{ set +x; } 2>/dev/null


set -x
infoln "Modify the configuration to append the anchor peer"
Modify the configuration to append the anchor peer 
jq '.channel_group.groups.Application.groups.CoupangMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.coupang.example.com","port": 7051}]},"version": "0"}}' config.json > modified_config.json
{ set +x; } 2>/dev/null


# Compute a config update, based on the differences between config.json and modified_config.json
infoln "Compute a config update, based on the differences between config.json and modified_config.json"

set -x
configtxlator proto_encode --input config.json --type common.Config --output config.pb  
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original config.pb --updated modified_config.pb --output config_update.pb


configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output CoupangMSPAnchor.tx
{ set +x; } 2>/dev/null


# Anchor peer set for coupang on channel
infoln "Anchor peer set for coupang on channel"
peer channel update -f CoupangMSPAnchor.tx -c "${CHANNEL_NAME}" -o localhost:7050  --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA"
popd




############################################################
######## set anchor peer for Auction in the channel ########
############################################################

# Fetching the most recent configuration block for the channel
infoln "Fetching the most recent configuration block for the channel"
export CORE_PEER_LOCALMSPID="AuctionMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/auction.example.com/peers/peer0.auction.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/auction.example.com/users/Admin@auction.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

pushd channel-artifacts
set -x
peer channel fetch config config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null


# Decoding config block to JSON and isolating config to config.json
infoln "Decoding config block to JSON and isolating config to config.json"
set -x
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
{ set +x; } 2>/dev/null


set -x
infoln "Modify the configuration to append the anchor peer"
Modify the configuration to append the anchor peer 
jq '.channel_group.groups.Application.groups.AuctionMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.auction.example.com","port": 9051}]},"version": "0"}}' config.json > modified_config.json
{ set +x; } 2>/dev/null


# Compute a config update, based on the differences between config.json and modified_config.json
infoln "Compute a config update, based on the differences between config.json and modified_config.json"

set -x
configtxlator proto_encode --input config.json --type common.Config --output config.pb  
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original config.pb --updated modified_config.pb --output config_update.pb


configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output AuctionMSPAnchor.tx
{ set +x; } 2>/dev/null


# Anchor peer set for auction on channel
infoln "Anchor peer set for auction on channel"
peer channel update -f AuctionMSPAnchor.tx -c "${CHANNEL_NAME}" -o localhost:7050  --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA"
popd




############################################################
######## set anchor peer for Bunjang in the channel ########
############################################################

# Fetching the most recent configuration block for the channel
infoln "Fetching the most recent configuration block for the channel"
export CORE_PEER_LOCALMSPID="BunjangMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/bunjang.example.com/peers/peer0.bunjang.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/bunjang.example.com/users/Admin@bunjang.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051

pushd channel-artifacts
set -x
peer channel fetch config config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null


# Decoding config block to JSON and isolating config to config.json
infoln "Decoding config block to JSON and isolating config to config.json"
set -x
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
{ set +x; } 2>/dev/null


set -x
infoln "Modify the configuration to append the anchor peer"
Modify the configuration to append the anchor peer 
jq '.channel_group.groups.Application.groups.BunjangMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.bunjang.example.com","port": 11051}]},"version": "0"}}' config.json > modified_config.json
{ set +x; } 2>/dev/null


# Compute a config update, based on the differences between config.json and modified_config.json
infoln "Compute a config update, based on the differences between config.json and modified_config.json"

set -x
configtxlator proto_encode --input config.json --type common.Config --output config.pb  
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original config.pb --updated modified_config.pb --output config_update.pb


configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output BunjangMSPAnchor.tx
{ set +x; } 2>/dev/null


# Anchor peer set for bunjang on channel
infoln "Anchor peer set for bunjang on channel"
peer channel update -f BunjangMSPAnchor.tx -c "${CHANNEL_NAME}" -o localhost:7050  --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA"
popd



###########################################################
######## set anchor peer for Daangn in the channel ########
###########################################################

# Fetching the most recent configuration block for the channel
infoln "Fetching the most recent configuration block for the channel"
export CORE_PEER_LOCALMSPID="DaangnMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/daangn.example.com/peers/peer0.daangn.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/daangn.example.com/users/Admin@daangn.example.com/msp
export CORE_PEER_ADDRESS=localhost:13051

pushd channel-artifacts
set -x
peer channel fetch config config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null


# Decoding config block to JSON and isolating config to config.json
infoln "Decoding config block to JSON and isolating config to config.json"
set -x
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
{ set +x; } 2>/dev/null


set -x
infoln "Modify the configuration to append the anchor peer"
Modify the configuration to append the anchor peer 
jq '.channel_group.groups.Application.groups.DaangnMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.daangn.example.com","port": 13051}]},"version": "0"}}' config.json > modified_config.json
{ set +x; } 2>/dev/null


# Compute a config update, based on the differences between config.json and modified_config.json
infoln "Compute a config update, based on the differences between config.json and modified_config.json"

set -x
configtxlator proto_encode --input config.json --type common.Config --output config.pb  
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original config.pb --updated modified_config.pb --output config_update.pb


configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output DaangnMSPAnchor.tx
{ set +x; } 2>/dev/null


# Anchor peer set for daangn on channel
infoln "Anchor peer set for daangn on channel"
peer channel update -f DaangnMSPAnchor.tx -c "${CHANNEL_NAME}" -o localhost:7050  --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA"
popd



##########################################################
######## set anchor peer for Kream in the channel ########
##########################################################

# Fetching the most recent configuration block for the channel
infoln "Fetching the most recent configuration block for the channel"
export CORE_PEER_LOCALMSPID="KreamMSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/kream.example.com/peers/peer0.kream.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/kream.example.com/users/Admin@kream.example.com/msp
export CORE_PEER_ADDRESS=localhost:15051

pushd channel-artifacts
set -x
peer channel fetch config config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile "$ORDERER_CA"
{ set +x; } 2>/dev/null


# Decoding config block to JSON and isolating config to config.json
infoln "Decoding config block to JSON and isolating config to config.json"
set -x
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
{ set +x; } 2>/dev/null


set -x
infoln "Modify the configuration to append the anchor peer"
Modify the configuration to append the anchor peer 
jq '.channel_group.groups.Application.groups.KreamMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.kream.example.com","port": 15051}]},"version": "0"}}' config.json > modified_config.json
{ set +x; } 2>/dev/null


# Compute a config update, based on the differences between config.json and modified_config.json
infoln "Compute a config update, based on the differences between config.json and modified_config.json"

set -x
configtxlator proto_encode --input config.json --type common.Config --output config.pb  
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original config.pb --updated modified_config.pb --output config_update.pb


configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output KreamMSPAnchor.tx
{ set +x; } 2>/dev/null


# Anchor peer set for kream on channel
infoln "Anchor peer set for kream on channel"
peer channel update -f KreamMSPAnchor.tx -c "${CHANNEL_NAME}" -o localhost:7050  --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA"
popd
