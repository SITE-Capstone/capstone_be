const Price = require("../models/price");
const apiCall = require("./apiCalls");


const symbols = ["BTC", "ETH", "ADA", "DOGE", "DOT", "XMR"];

async function updateYearly(symbol){
    let data = await apiCall.getCoinYearlyPriceHistory(symbol);
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_day", smallSymbol)
    return "success"
}

async function updateYearlyForAll(){
    console.log("yearly Call")
    for (let i = 0; i < symbols.length; i++) {
        await updateYearly(symbols[i]);
      }
}

async function updateWeekly(symbol){
    let data = await apiCall.getCoinWeeklyPriceHistory(symbol);
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_hour", smallSymbol)
}

async function updateWeeklyForAll(){
    for (let i = 0; i < symbols.length; i++) {
        await updateWeekly(symbols[i]);
      }
}


async function updateDaily(symbol){
    let data = await apiCall.getCoinDailyPriceHistory(symbol);
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_minute", smallSymbol)
}

async function updateDailyForAll(){
    for (let i = 0; i < symbols.length; i++) {
        await updateDaily(symbols[i]);
      }
}


async function updateCurrentPrice(symbol){
    let data = await apiCall.getCoinCurrentPrice(symbol)
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "current_price", smallSymbol)
}

async function updateCurrentPriceForAll(){
    for (let i = 0; i < symbols.length; i++) {
        await updateCurrentPrice(symbols[i]);
      }
}

module.exports ={
    updateCurrentPrice,
    updateCurrentPriceForAll,
    updateDaily,
    updateDailyForAll,
    updateWeekly,
    updateWeeklyForAll,
    updateYearly,
    updateYearlyForAll
}