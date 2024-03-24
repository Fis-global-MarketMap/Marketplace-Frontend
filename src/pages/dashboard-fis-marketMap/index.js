import React from "react"
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "./Breadcrumb";

//Import Components
import CardUser from "./card-user";
import CardWelcome from "./card-welcome";
import MiniWidget from "./mini-widget";
import WalletBalance from "./wallet-balance";
import OverView from "./overview";
import Transactions from "./transactions";
import Notifications from "./notifications";
import BuySell from "./buy-sell";

import "./style.css"

//Bitcoin Chart
const series1 = [
  { name: "BTC", data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] },
]
const options1 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#f1b44c"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } },
}

//Etherium Chart
const series2 = [
  { name: "ETH", data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] },
]
const options2 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#556ee6"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } },
}

//LiteCoin Chart
const series3 = [
  { name: "LTC", data: [35, 53, 93, 47, 54, 24, 47, 75, 65, 19, 14] },
]
const options3 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#50a5f1"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } },
}

const Dashboard = () => {
  const reports = [
    {
      title: "Bitcoin",
      icon: "mdi mdi-bitcoin",
      color: "warning",
      value: "$ 9134.39",
      desc: "+ 0.0012 ( 0.2 % )",
      series: series1,
      options: options1,
      arrowUpDown: 'mdi mdi-arrow-up ms-1 text-success'
    },
    {
      title: "Ethereum",
      icon: "mdi mdi-ethereum",
      color: "primary",
      value: "$ 245.44",
      desc: "- 4.102 ( 0.1 % )",
      series: series2,
      options: options2,
      arrowUpDown: 'mdi mdi-arrow-down ms-1 text-danger'
    },
    {
      title: "litecoin",
      icon: "mdi mdi-litecoin",
      color: "info",
      value: "$ 63.61",
      desc: "+ 1.792 ( 0.1 % )",
      series: series3,
      options: options3,
      arrowUpDown: 'mdi mdi-arrow-up ms-1 text-success'
    },
  ];

  //meta title
  document.title = "Crypto Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="h3 text-muted">My Favorite</div>
        <div id="starred" className="bg-white px-2 pt-1 mt-2">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex mt-2 border-right">
                      <div className="box p-2 rounded">
                        <span className="fas fa-star text-primary px-1" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Name</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src="https://www.freepnglogos.com/uploads/bitcoin-png/bitcoin-all-about-bitcoins-9.png"
                            alt=""
                            className="icons"
                          />
                        </div>
                        <b className="pl-2">Bitcoin</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Market cap</div>
                      <div>
                        <b>$146,169,768.00</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Price</div>
                      <div>
                        <b>$8,536.79</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Volume</div>
                        <div className="green-label mx-1 px-1 rounded">74</div>
                      </div>
                      <div>
                        <b>$7,576,878.89</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Change</div>
                        <div className="orange-label mx-1 px-1 rounded">20%</div>
                      </div>
                      <div>
                        <b className="red">-1.22%</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="graph">
                      <img
                        src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png"
                        alt=""
                      />
                      <div className="dot" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-lg-flex align-items-lg-center py-4">
          <div className="h3 text-muted">Top Cryptocurrency Prices</div>
          <div className="ml-auto">
            <select name="industry" id="industry" className="mx-lg-3 mr-md-4">
              <option value="" hidden="" selected="">
                Choose Industry
              </option>
              <option value="dark">Dark Net</option>
            </select>
            <select name="plat" id="plat">
              <option value="" hidden="" selected="">
                Choose Platform
              </option>
              <option value="darkweb">Dark Web</option>
            </select>
          </div>
        </div>
        <div id="top">
          <div className="bg-white table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex mt-2 border-right">
                      <div className="box p-2 rounded">
                        <span className="text-primary px-2 font-weight-bold">01</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Name</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src="https://freepngimg.com/thumb/bitcoin/59703-classic-bitcoin-virtual-cryptocurrency-currency-ethereum.png"
                            alt=""
                            className="icons"
                          />
                        </div>
                        <b className="pl-2">Ethereum</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Market cap</div>
                      <div>
                        <b>$146,169,768.00</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Price</div>
                      <div>
                        <b>$8,536.79</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Volume</div>
                        <div className="green-label mx-1 px-1 rounded">74</div>
                      </div>
                      <div>
                        <b>$7,576,878.89</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Change</div>
                        <div className="orange-label mx-1 px-1 rounded">20%</div>
                      </div>
                      <div>
                        <b className="red">-0.18%</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="graph">
                      <img
                        src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png"
                        alt=""
                        id="ethereum"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex mt-2 border-right">
                      <div className="box p-2 rounded">
                        <span className="text-primary px-1 font-weight-bold">02</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Name</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src="https://freepngimg.com/thumb/bitcoin/59526-cryptocurrency-badge-bitcoin-gold-png-file-hd-thumb.png"
                            alt=""
                            className="icons"
                          />
                        </div>
                        <b className="pl-2">Bitcoin cash</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Market cap</div>
                      <div>
                        <b>$446,569,768.00</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Price</div>
                      <div>
                        <b>$8,836.79</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Volume</div>
                        <div className="green-label mx-1 px-1 rounded">74</div>
                      </div>
                      <div>
                        <b>$7,576,878.89</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Change</div>
                        <div className="orange-label mx-1 px-1 rounded">20%</div>
                      </div>
                      <div>
                        <b className="green">+4.00%</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="graph">
                      <img
                        src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png"
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex mt-2 border-right">
                      <div className="box p-2 rounded">
                        <span className="text-primary px-1 font-weight-bold">03</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Name</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src="https://freepngimg.com/thumb/bitcoin/59549-cryptocurrency-money-bitcoin-gold-cash-free-photo-png-thumb.png"
                            alt=""
                            className="icons"
                          />
                        </div>
                        <b className="pl-2">Ripple</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Market cap</div>
                      <div>
                        <b>$56,169,768.00</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Price</div>
                      <div>
                        <b>$5,536.79</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Volume</div>
                        <div className="green-label mx-1 px-1 rounded">74</div>
                      </div>
                      <div>
                        <b>$17,576,878.89</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Change</div>
                        <div className="orange-label mx-1 px-1 rounded">20%</div>
                      </div>
                      <div>
                        <b className="green">+1.71%</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="graph">
                      <img
                        src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png"
                        alt=""
                        id="ripple"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex mt-2 border-right">
                      <div className="box p-2 rounded">
                        <span className="text-primary px-1 font-weight-bold">04</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Name</div>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src="https://freepngimg.com/thumb/bitcoin/59842-cryptocurrency-bitfinex-bitcoin-exchange-png-download-free-thumb.png"
                            alt=""
                            className="icons"
                          />
                        </div>
                        <b className="pl-2">EOS</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Market cap</div>
                      <div>
                        <b>$12,169,768.00</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="text-muted">Price</div>
                      <div>
                        <b>$14.79</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Volume</div>
                        <div className="green-label mx-1 px-1 rounded">74</div>
                      </div>
                      <div>
                        <b>$76,878.89</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center labels">
                        <div className="text-muted">Change</div>
                        <div className="orange-label mx-1 px-1 rounded">20%</div>
                      </div>
                      <div>
                        <b className="red">-5.86%</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="graph">
                      <img
                        src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png"
                        alt=""
                        id="eos"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center py-2">
          <div>
            <a href="#">
              Load more <span className="text-white">26</span>
            </a>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Dashboard
