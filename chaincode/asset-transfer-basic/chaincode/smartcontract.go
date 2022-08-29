package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an TradeInfo
type SmartContract struct {
	contractapi.Contract
}

// TradeInfo describes basic details of what makes up a simple asset
type TradeInfo struct {
	TradeCode int      `json:"tradeCode"`
	ItemCode  string   `json:"itemCode"`
	Platform  int      `json:"platform"`
	Price     int      `json:"price"`
	Traded    string   `json:"traded"`
	Type      int      `json:"type"`
	SellerId  int      `json:"sellerId"`
	BuyerId   int      `json:"buyerId"`
	Comments  Comments `json:"comments"`
}

type Comments struct {
	SellersComment Comment `json:"sellersComment"`
	BuyersComment  Comment `json:"buyersComment"`
}

type Comment struct {
	OwnerId    int `json:"owner"`
	CommentURI int `json:""commentURI`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	assets := []TradeInfo{
		{TradeCode: 1, ItemCode: "1", Platform: 1, Price: 10000, Traded: "2020-08-18", Type: 2, SellerId: 1, BuyerId: 2, Comments: Comments{SellersComment: Comment{OwnerId: 1, CommentURI: 1}, BuyersComment: Comment{OwnerId: 2, CommentURI: 1}}},
		{TradeCode: 2, ItemCode: "2", Platform: 2, Price: 12000, Traded: "2022-08-20", Type: 2, SellerId: 2, BuyerId: 3, Comments: Comments{SellersComment: Comment{OwnerId: 2, CommentURI: 2}, BuyersComment: Comment{OwnerId: 3, CommentURI: 2}}},
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.ItemCode, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateTradeInfo issues a new asset to the world state with given details.
func (s *SmartContract) CreateTradeInfo(ctx contractapi.TransactionContextInterface, tradeCode int, itemCode string, platform int, price int, traded string, _type int, sellerId int, buyerId int, sellerCommentURI int, buyerCommentURI int) error {
	exists, err := s.TradeInfoExists(ctx, itemCode)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", itemCode)
	}

	asset := TradeInfo{
		TradeCode: tradeCode,
		ItemCode:  itemCode,
		Platform:  platform,
		Price:     price,
		Traded:    traded,
		Type:      _type,
		SellerId:  sellerId,
		BuyerId:   buyerId,
		Comments: Comments{
			SellersComment: Comment{
				OwnerId:    sellerId,
				CommentURI: sellerCommentURI},
			BuyersComment: Comment{
				OwnerId:    buyerId,
				CommentURI: buyerCommentURI}}}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(itemCode, assetJSON)
}

// ReadTradeInfo returns the asset stored in the world state with given id.
func (s *SmartContract) GetInfoByItem(ctx contractapi.TransactionContextInterface, itemCode string) (*TradeInfo, error) {
	assetJSON, err := ctx.GetStub().GetState(itemCode)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", itemCode)
	}

	var asset TradeInfo
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

// UpdateTradeInfo updates an existing asset in the world state with provided parameters.
func (s *SmartContract) ModifyTradeInfo(ctx contractapi.TransactionContextInterface, tradeCode int, itemCode string, platform int, price int, traded string, _type int, sellerId int, buyerId int, sellerCommentURI int, buyerCommentURI int) error {
	exists, err := s.TradeInfoExists(ctx, itemCode)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", tradeCode)
	}

	// overwriting original asset with new asset
	asset := TradeInfo{
		TradeCode: tradeCode,
		ItemCode:  itemCode,
		Platform:  platform,
		Price:     price,
		Traded:    traded,
		Type:      _type,
		SellerId:  sellerId,
		BuyerId:   buyerId,
		Comments: Comments{
			SellersComment: Comment{
				OwnerId:    sellerId,
				CommentURI: sellerCommentURI},
			BuyersComment: Comment{
				OwnerId:    buyerId,
				CommentURI: buyerCommentURI}}}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(itemCode, assetJSON)
}

// DeleteTradeInfo deletes an given asset from the world state.
func (s *SmartContract) DeleteTradeInfo(ctx contractapi.TransactionContextInterface, itemCode string) error {
	exists, err := s.TradeInfoExists(ctx, itemCode)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", itemCode)
	}

	return ctx.GetStub().DelState(itemCode)
}

// TradeInfoExists returns true when asset with given ID exists in world state
func (s *SmartContract) TradeInfoExists(ctx contractapi.TransactionContextInterface, itemCode string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(itemCode)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// TransferTradeInfo updates the owner field of asset with given id in world state.
func (s *SmartContract) TransferTradeInfo(ctx contractapi.TransactionContextInterface, tradeCode int, itemCode string, platform int, price int, traded string, _type int, sellerId int, buyerId int, sellerCommentURI int, buyerCommentURI int) error {
	asset, err := s.GetInfoByItem(ctx, itemCode)
	if err != nil {
		return err
	}

	asset.TradeCode = tradeCode
	asset.Platform = platform
	asset.Price = price
	asset.Type = _type
	asset.SellerId = sellerId
	asset.BuyerId = buyerId
	asset.Comments.SellersComment.OwnerId = sellerId
	asset.Comments.SellersComment.CommentURI = sellerCommentURI
	asset.Comments.BuyersComment.OwnerId = buyerId
	asset.Comments.BuyersComment.CommentURI = buyerCommentURI
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(itemCode, assetJSON)
}

// GetAllTradeInfos returns all assets found in world state
func (s *SmartContract) GetAllTradeInfos(ctx contractapi.TransactionContextInterface) ([]*TradeInfo, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*TradeInfo
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset TradeInfo
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}

func (s *SmartContract) GetHistory(ctx contractapi.TransactionContextInterface, itemCode string) ([]*TradeInfo, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetHistoryForKey(itemCode)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*TradeInfo
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset TradeInfo
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}
