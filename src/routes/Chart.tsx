import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IChart {
    coinId: string;
}
interface IHistoricalData {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface Data {
    x: number;
    y: number;
}
function Chart() {
    const { coinId } = useOutletContext<IChart>();
    const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    return (
        <div>
            {isLoading ? "Loading Chart ...."
                :
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            data: data?.map((price) => {
                                return ({
                                    x: price.time_open,
                                    y: [price.open.toFixed(4), price.high.toFixed(4), price.low.toFixed(4), price.close.toFixed(4)]
                                });
                            }
                            ) as [] // ?? []
                        }
                    ]}
                    options={{
                        theme: { mode: "dark" },
                        chart: {
                            type: 'candlestick',
                            height: 500
                        },
                        title: {
                            text: coinId,
                            align: 'left'
                        },
                        xaxis: {
                            type: 'datetime'
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            },

                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: '#12ea9e',
                                    downward: '#e51414'
                                }
                            }
                        }

                    }} />}
        </div>
    );
}

export default Chart;