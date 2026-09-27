import { useLayoutEffect } from 'react'
import App from '../App'
import { useAppStore } from '../store'
import type { QuoteLine } from './model'
export default function Walkthrough({quote,onExit}: {quote:QuoteLine[];onExit:(quote:QuoteLine[])=>void}) {
  useLayoutEffect(()=>{useAppStore.setState({quoteItems:quote.map(line=>{const [vendorId,productId]=line.key.split('/');return {vendorId,productId}})})},[])
  function exit() {
    document.exitPointerLock?.()
    const next=useAppStore.getState().quoteItems.map(item=>{const key=`${item.vendorId}/${item.productId}`;return {key,quantity:quote.find(line=>line.key===key)?.quantity??1}})
    useAppStore.setState({started:false,selected:null,nearby:null})
    onExit(next)
  }
  return <><button className="return-market" onClick={exit}>بازگشت به بازار ←</button><App/></>
}
