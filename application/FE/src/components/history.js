import { useEffect, useState } from "react";
import InfoWithHistory from "./infoWithHistory.js";
import TradeInfoDetail from "./tradeInfoDetail.js";

function History({ itemInfo }) {
    const [isDetail, setIsDetail] = useState(false)
    const [chosenData, setChosenData] = useState({})
    const [data, setData] = useState();

    useEffect(() => {
        fetch('http://localhost:3065/search', {
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemCode: itemInfo.itemCode }),
        })
            .then((response) => response.json())
            .then((el) => {
                console.log('성공:', el);
                setData(el);
            })
            .catch((error) => {
                console.error('실패:', error);
            });
    }, [])
    return (
        <div>
            {
                isDetail == false ?
                    <div style={{ marginLeft: "70px" }}>
                        {data !== undefined ? data.map((el) => {
                            return <InfoWithHistory key={el.tradeCode} data={el} setIsDetail={setIsDetail} setChosenData={setChosenData} />
                        }) : null}
                    </div> : <TradeInfoDetail data={chosenData} setIsDetail={setIsDetail} />
            }
        </div>
    )
}

export default History;