import { Tab, Tabs } from 'react-bootstrap';
import ItemInfo from '../components/itemInfo';
import History from '../components/history';
import TradeControll from '../components/tradeControll';
import { useState } from 'react';

function ItemPage({ itemInfo, userInfo }) {
    const [key, setKey] = useState('info');
    return (
        <div style={{ width: '500px', marginTop: '330px' }}>
            <div>
                <Tabs
                    defaultActiveKey="profile"
                    id="tabs_selection"
                    className="mb-3"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    justify="true"
                >
                    <Tab eventKey="info" title="제품 정보">
                        <ItemInfo itemInfo={itemInfo} />
                    </Tab>
                    <Tab eventKey="history" title="거래 기록">
                        <History itemInfo={itemInfo} />
                    </Tab>
                    <Tab eventKey="trade" title="거래 하기" >
                        <TradeControll itemInfo={itemInfo} userInfo={userInfo} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ItemPage;