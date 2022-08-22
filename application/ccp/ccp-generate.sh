#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ${DIR}/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ${DIR}/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NET_DIR_PATH="${DIR}/../../basic-network"

ORG=1
P0PORT=7051
CAPORT=7054
PEERPEM=${NET_DIR_PATH}/organizations/peerOrganizations/coupang.example.com/tlsca/tlsca.coupang.example.com-cert.pem
CAPEM=${NET_DIR_PATH}/organizations/peerOrganizations/coupang.example.com/ca/ca.coupang.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-coupang.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-coupang.yaml

ORG=2
P0PORT=9051
CAPORT=8054
PEERPEM=${NET_DIR_PATH}/organizations/peerOrganizations/auction.example.com/tlsca/tlsca.auction.example.com-cert.pem
CAPEM=${NET_DIR_PATH}/organizations/peerOrganizations/auction.example.com/ca/ca.auction.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-auction.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-auction.yaml

ORG=3
P0PORT=11051
CAPORT=9054
PEERPEM=${NET_DIR_PATH}/organizations/peerOrganizations/bunjang.example.com/tlsca/tlsca.bunjang.example.com-cert.pem
CAPEM=${NET_DIR_PATH}/organizations/peerOrganizations/bunjang.example.com/ca/ca.bunjang.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-bunjang.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-bunjang.yaml

ORG=4
P0PORT=13051
CAPORT=10054
PEERPEM=${NET_DIR_PATH}/organizations/peerOrganizations/daangn.example.com/tlsca/tlsca.daangn.example.com-cert.pem
CAPEM=${NET_DIR_PATH}/organizations/peerOrganizations/daangn.example.com/ca/ca.daangn.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-daangn.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-daangn.yaml

ORG=5
P0PORT=15051
CAPORT=11054
PEERPEM=${NET_DIR_PATH}/organizations/peerOrganizations/kream.example.com/tlsca/tlsca.kream.example.com-cert.pem
CAPEM=${NET_DIR_PATH}/organizations/peerOrganizations/kream.example.com/ca/ca.kream.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-kream.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > ${DIR}/connection-kream.yaml