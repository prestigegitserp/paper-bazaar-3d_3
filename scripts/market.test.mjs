import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { normalize, listings, filterListings, restoreQuote, quoteText } from '../src/market/model.ts'
const catalog=JSON.parse(readFileSync(new URL('../server/data/catalog.seed.json',import.meta.url)))
const items=listings(catalog)
test('Persian search normalizes Arabic letters and zero-width separators',()=>{assert.equal(normalize(' كاغذ يک\u200cبرگ '),'کاغذ یک برگ');assert.ok(filterListings(items,'كاغذ','all','','default').length>0)})
test('vendor and category filters combine without mutating catalog',()=>{const snapshot=JSON.stringify(items);const result=filterListings(items,'','office',items[0].vendor.id,'price');assert.ok(result.length>0);assert.ok(result.every(p=>p.category==='office'&&p.vendor.id===items[0].vendor.id));assert.equal(JSON.stringify(items),snapshot)})
test('unknown prices sort after numeric prices',()=>{const result=filterListings(items,'','all','','price');const firstUnknown=result.findIndex(p=>p.numericPrice===undefined);assert.ok(firstUnknown>0);assert.ok(result.slice(firstUnknown).every(p=>p.numericPrice===undefined))})
test('stored quotes reject invalid quantities, missing products and duplicates',()=>{const key=items[0].key;assert.deepEqual(restoreQuote([{key,quantity:2},{key,quantity:3},{key:'missing',quantity:1},{key:items[1].key,quantity:-1},{key:items[2].key,quantity:Infinity}],items),[{key,quantity:2}]);assert.deepEqual(restoreQuote({},items),[])})
test('export includes quantity and terms without claiming submission or pricing unknown units',()=>{const text=quoteText([{key:items[0].key,quantity:12}],items,'تحویل تهران');assert.ok(text.includes('12'));assert.ok(text.includes(items[0].vendor.name));assert.ok(text.includes('تحویل تهران'));assert.ok(text.includes('ارسال نشده'));assert.ok(text.includes('واحد نیازمند تأیید'))})
