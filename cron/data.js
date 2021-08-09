const Price = require("../models/price");
const apiCall = require("./apiCalls");


const symbols = ["BTC", "ETH", "ADA", "DOGE", "DOT", "XMR"];

async function updatePricesByDay(symbol){
    let data = await apiCall.getCoinYearlyPriceHistory(symbol);
    console.log("XXXXX",data)
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_day", smallSymbol)
    return "success"
}

async function updatePricesByDayForAll(){
    for (let i = 0; i < symbols.length; i++) {
        console.log("yearly Call", symbols[i])
        await updatePricesByDay(symbols[i]);
      }
}

async function updatePricesByHour(symbol){
    let data = await apiCall.getCoinWeeklyPriceHistory(symbol);
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_hour", smallSymbol)
}

async function updatePricesByHourForAll(){
    for (let i = 0; i < symbols.length; i++) {
        await updatePricesByHour(symbols[i]);
      }
}


async function updatePricesByMinute(symbol){
    let data = await apiCall.getCoinDailyPriceHistory(symbol);
    let smallSymbol = symbol.toLowerCase()
    await Price.editCoinData(data, "prices_by_minute", smallSymbol)
}

async function updatePricesByMinuteForAll(){
    for (let i = 0; i < symbols.length; i++) {
        await updatePricesByMinute(symbols[i]);
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
    updatePricesByDay,
    updatePricesByDayForAll,
    updatePricesByHour,
    updatePricesByHourForAll,
    updatePricesByMinute,
    updatePricesByMinuteForAll
}