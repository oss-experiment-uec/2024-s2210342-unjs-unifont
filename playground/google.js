// @ts-check

import { createUnifont, providers } from 'unifont'

import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs-lite'

const storage = createStorage({
  driver: fsDriver({ base: '/app/artifact' }),
})

const unifont = await createUnifont([
  providers.google(),
], { storage })

const fonts = await unifont.resolveFont('Noto Sans JP')
const minimizedFonts = await unifont.resolveFont('Noto Sans JP', { glyphs: ['Hello, World!'] })

console.log(fonts)
console.log(minimizedFonts)
