// @ts-check

import { createUnifont, providers } from 'unifont'

import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs-lite'

const storage = createStorage({
  driver: fsDriver({ base: '/app/artifact' }),
})
const unifont = await createUnifont([providers.google()], { storage })

/**
 * バイト数を受け取り、適切な単位に変換して返すs
 * @param {number} byte
 * @returns {string}
 */
function formatByteNumber(byte) {
  const units = ['B', 'KB', 'MB']
  let unitIndex = 0
  while (byte >= 1024 && unitIndex < units.length - 1) {
    byte /= 1024
    unitIndex++
  }
  return `${byte.toFixed(2)} ${units[unitIndex]}`
}

/**
 * url の配列を受け取り、それらのファイルをダウンロードしてサイズを合計する
 * @param {string[]} urls
 * @returns {Promise<number>}
 */
async function downloadAllAndGetSumOfSizes(urls) {
  const sizes = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
        },
      })
      const blob = await res.blob()
      return blob.size
    }),
  )
  return sizes.reduce((acc, cur) => acc + cur, 0)
}

async function main() {
  // フォントの情報を保存する
  const fonts = await unifont.resolveFont('Noto Sans JP')
  const minimizedFonts = await unifont.resolveFont('Noto Sans JP', {
    glyphs: ['Hello, World!'],
  })

  // それぞれ、分割されたファイルの URL を取得する
  const normalUrls = fonts.fonts.flatMap(d => d.src.map(s => s.url))
  const minifiedUrls = minimizedFonts.fonts.flatMap(d => d.src.map(s => s.url))

  // すべてのファイルをダウンロードしてサイズを合計し、出力
  console.log(
    '最適化なしのサイズ: ',
    formatByteNumber(await downloadAllAndGetSumOfSizes(normalUrls)),
  )
  console.log(
    '最適化したサイズ: ',
    formatByteNumber(await downloadAllAndGetSumOfSizes(minifiedUrls)),
  )
}

void main().catch(console.error)
