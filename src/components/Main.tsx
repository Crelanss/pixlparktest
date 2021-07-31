import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import * as helper from '../helpers/getAccessData'

interface Order {
    Id: string
    Title: string
    Status: string
}

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding-bottom: 20px;
`

const OrderComponent = styled.div`
  display: flex;
  flex-direction: column;
`

const publicKey: string = '38cd79b5f2b2486d86f562e3c43034f8'
const privateKey: string = '8e49ff607b1f46e1a5e8f6ad5d312a80'

const getToken = async () => {
    return await helper.GetAccessToken(publicKey, privateKey)
}

const Main: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            fetch(`orders?oauth_token=${await getToken()}`)
                .then(response => response.json())
                .then(data => setOrders(data.Result))
                .then(() => setIsLoaded(true))
        })()
    }, [])

    if (isLoaded) {
        return (
            <Wrapper>

                {orders.map((order, index) => (
                    <OrderComponent key={index}>
                        <h1>Заказ номер {index}</h1>
                        <span><strong>id</strong>: {order.Id}</span>
                        <span><strong>Наименование</strong>: {order.Title}</span>
                        <span><strong>Статус</strong>: {order.Status}</span>
                    </OrderComponent>
                ))}

            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <h1>
                    Загрузка, ждите
                </h1>
            </Wrapper>
        )
    }
}

export default Main